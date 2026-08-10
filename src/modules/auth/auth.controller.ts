import type { Request, Response } from 'express';
import { hashPassword, verifyPassword } from './auth.service.js'
import type { SignupBody, LoginBody } from './auth.types.js';
import { db } from '../../db/index.js'
import { users } from '../../db/schema.js'
import { eq } from 'drizzle-orm'

export async function signup(req: Request<{},{}, SignupBody>, res: Response): Promise<void> {
	console.log('BODY:', req.body);
	const { email, password } = req.body;
	const passwordHash = await hashPassword(password);
	try {
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
	catch (err) {
		console.error('FULL ERROR', err);
		res.status(500).json({error: 'Signup failed'})
	}
}

export async function login(req: Request<{}, {}, LoginBody>, res: Response): Promise<void>{
	const {email, password } = req.body;
	const [user] = await db
		.select()
		.from(users)
		.where(eq(users.email, email));
	
	if (!user) {
		res.status(401).json({error: 'Invalid credentials'});
		return;
	}

	if (!user.passwordHash) {
		res.status(401).json({error: 'Invalid credentials'})
		return;
	}
	const isMatch = await verifyPassword(password, user.passwordHash)
	if (!isMatch) {
		res.status(401).json({error: 'Invalid credentials'})
		return;
	}
	res.status(200).json({id: user.id, email: user.email })
}

