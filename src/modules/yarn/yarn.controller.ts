import { createYarnSchema } from "../yarn/yarn.validation";
import { db } from '../../db/index.js'
import { yarn } from '../../db/schema'
import type { Request, Response } from 'express';

export async function createYarn(req: Request, res:Response): Promise<void> {
	if (!req.user) {
		res.status(401).json({error: 'Unauthorized'});
		return;
	}
	
	const validated = createYarnSchema.parse(req.body);
	const [newYarn] = await db.insert(yarn).values({
	...validated,
	userId: req.user.id,
}).returning();
	res.status(201).json(newYarn);
}