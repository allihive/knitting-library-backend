import { db } from '../../db/index.js'
import type { Request, Response } from 'express'
import { patterns, patternYarns, patternTools } from '../../db/schema.js'
import { createPatternSchema } from './patterns.validation.js'
import { idParamSchema } from '../shared/idParam.validation.js';
import { NotFoundError } from '../shared/errors.js';
import { eq, and } from 'drizzle-orm';

export async function createPattern(req: Request, res: Response): Promise<void> {
	if (!req.user) {
		res.status(401).json({error: 'Unauthorized'});
		return;
	}

	const validated = createPatternSchema.parse(req.body);
	const { tools, yarns, ...patternFields} = validated;
	const newPattern = await db.transaction(async (tx) => {
		const [pattern] = await tx.insert(patterns).values({
		...patternFields,
		userId: req.user!.userId,
	}).returning();

	if (!pattern) {
		throw new Error('Failed to create pattern');
	}

	if (tools && tools.length > 0) {
		await tx.insert(patternTools).values(
			tools.map((tool) => ({ ...tool, patternId: pattern.id}))
		)
	}
	if (yarns && yarns.length) {
		await tx.insert(patternYarns).values(
			yarns.map((yarn) => ({...yarn, patternId: pattern.id}))
		)
	}
	return pattern;
	})
	res.status(201).json(newPattern)
}

export async function getPattern(req: Request, res: Response): Promise<void> {
	if (!req.user) {
		res.status(400).json({error: 'Unauthorized'});
		return;
	}

	const { id } = idParamSchema.parse(req.params);

	const pattern = await db.query.patterns.findFirst ({
		where: (patterns, { eq, and }) => and(eq(patterns.id, id), eq(patterns.userId, req.user!.userId)),
		with: {
			patternTools: true,
			patternYarns: true,
		},
	});
	if (!pattern) {
		throw new NotFoundError;
	}

	res.status(200).json(pattern);
}

export async function getAllPatterns(req: Request, res: Response): Promise<void> {
	if (!req.user) {
		res.status(401).json({error: 'Unauthorized'});
		return;
	}

	const pattern = await db.query.patterns.findMany ({
		where: (patterns, { eq }) => eq(patterns.userId, req.user!.userId),
		with: {
		patternTools: true,
		patternYarns: true,
	},
});
	res.status(200).json(pattern);

}

export async function deletePattern(req: Request, res: Response): Promise<void> {
	if (!req.user) {
		res.status(401).json({error: 'Unauthorized'});
		return;
	}
	const { id } = idParamSchema.parse(req.params);

	const [deletePattern] = await db
		.delete(patterns)
		.where(and(eq(patterns.id, id), eq(patterns.userId, req.user.userId)))
		.returning()
	if (!deletePattern) {
		throw new NotFoundError;
	}

	res.status(200).json(deletePattern)
	
}

export async function updatePattern(req: Request, res: Response): Promise<void> {

}

export async function replacePatternTools(req: Request, res: Response): Promise <void> {

}

export async function replacePatternYarn(req: Request, res: Response): Promise<void> {
	
}


// {
//     "patternName": "Cozy Cardigan",
//     "sourceUrl": "https://example.com/pattern",
//     "difficulty": "intermediate",
//     "status": "In queue",
//     "tools": [
//         { "toolType": "circular needles", "sizeMm": 4.5, "needleLengthCm": 80, "note": "body" },
//         { "toolType": "circular needles", "sizeMm": 4.0, "needleLengthCm": 40, "note": "ribbing" }
//     ],
//     "yarn": [
//         { "material": "wool", "recommendedNeedleMm": 4.5, "minLengthM": 800, "minGrams": 350 }
//     ]
// }