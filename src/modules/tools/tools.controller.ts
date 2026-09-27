import type { Request, Response } from "express";
import { createToolSchema } from "./tools.validation";
import { db } from "../../db/index";
import { tools } from "../../db/schema";
import { idParamSchema } from "../shared/idParam.validation";
import { findOwnedResource } from "../shared/findOwnResources";
import { eq } from 'drizzle-orm'

export async function createTool(req: Request, res: Response): Promise<void> {
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

export async function getTool(req: Request, res:Response): Promise<void> {
	if (!req.user) {
		res.status(401).json({error: 'Unauthorized'});
		return;
	}

	const { id } = idParamSchema.parse(req.params);
	const toolItem = await findOwnedResource(tools, id, req.user.userId)

	res.status(200).json(toolItem);
	return;
}

export async function getAllTools(req: Request, res: Response): Promise<void> {
	if (!req.user) {
		res.status(401).json({error: 'Unauthorized'});
		return;
	}

	const toolItems = await db 
		.select()
		.from(tools)
		.where(eq(tools.userId, req.user.userId))

	res.status(200).json(toolItems)
}

