import { db } from '../../db/index.js'
import type { Request, Response } from 'express'
import { patterns, patternYarns, patternTools } from '../../db/schema.js'
import { createPatternSchema } from './patterns.validation.js'

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