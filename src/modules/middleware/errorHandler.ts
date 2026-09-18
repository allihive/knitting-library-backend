import type { Request, Response, NextFunction } from "express";
import { ZodError } from 'zod';

export function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction): void{
	console.error(err);
	if (err instanceof ZodError) {
		res.status(400).json({ error: err.issues });
		return;
	}

	res.status(500).json({ error: 'Something went wrong'})
}