import { createYarnSchema } from "../yarn/yarn.validation";
import { db } from '../../db/index.js'
import { yarn } from '../../db/schema'
import type { Request, Response } from 'express';
import { findOwnedResource } from "../shared/findOwnResources";
import { eq } from 'drizzle-orm'
import { idParamSchema } from "../shared/idParam.validation";

export async function createYarn(req: Request, res:Response): Promise<void> {
	if (!req.user) {
		res.status(401).json({error: 'Unauthorized'});
		return;
	}
	
	const validated = createYarnSchema.parse(req.body);
	const [newYarn] = await db.insert(yarn).values({
	...validated,
	userId: req.user.userId,
}).returning();
	res.status(201).json(newYarn);
}

export async function getYarn(req: Request, res: Response): Promise<void> {
		if (!req.user) {
		res.status(401).json({error: 'Unauthorized'});
		return;
	}
	const { id } = idParamSchema.parse(req.params);

	const yarnItem = await findOwnedResource(yarn, id, req.user.userId);
	res.status(200).json(yarnItem);
	return;
}

export async function getAllYarn(req: Request, res: Response): Promise<void> {
	if (!req.user) {
		res.status(401).json({error: 'Unauthorized'});
		return;
	}
	const yarnItems = await db
		.select()
		.from(yarn)
		.where(eq(yarn.userId, req.user.userId))
	res.status(200).json(yarnItems);
}
