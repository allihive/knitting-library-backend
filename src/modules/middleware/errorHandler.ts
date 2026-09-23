import type { Request, Response, NextFunction } from "express";
import { ZodError } from 'zod';
import { NotFoundError } from "../shared/errors";

export function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction): void{
	console.error(err);
	if (err instanceof ZodError) {
		res.status(400).json({ error: err.issues });
		return;
	}
	if (err instanceof NotFoundError) {
		res.status(404).json({error: err.message});
		return;
	}

	res.status(500).json({ error: 'Something went wrong'})
}