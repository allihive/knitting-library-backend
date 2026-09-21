import type { Request, Response } from "express";
import { createToolSchema } from "./tools.validation";
import { db } from "../../db/index";
import { tools } from "../../db/schema";

export async function createTool(req: Request, res: Response): Promise<void> {
	console.log('auth header:', req.headers.authorization);
	console.log('req.user:', req.user);

	if (!req.user) {
		res.status(401).json({error: 'Unauthorized'});
		return;
	}
	const validated = createToolSchema.parse(req.body);
	const [newTool] = await db.insert(tools).values({
		...validated,
		userId: req.user.userId,
	}).returning();
	res.status(201).json(newTool)

}