import type { Request, Response } from 'express';
import { hashPassword, verifyPassword } from './auth.service.js'
import type { SignupBody, LoginBody } from './auth.types.js';
import { db } from '../../db/index.js'
import { users } from '../../db/schema.js'

async function signup(req: Request<{},{}, SignupBody>, res: Response): Promise<void> {
	const { email, password } = req.body;
	const passwordHash = await hashPassword(password);
	const [user] = await db
		.insert(users)
		.values({email, passwordHash})
		.returning();

	if (!user) {
		res.status(500).json({error: 'failed to create user'});
		return;
	}
	res.status(201).json({id: user.id, email: user.email})
}