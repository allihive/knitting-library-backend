import type { Request, Response } from 'express';
import { generateAccessToken, generateRefreshToken, hashPassword, passwordSecurity, verifyPassword } from './auth.service.js'
import type { SignupBody, LoginBody, RefreshBody, TokenPayload } from './auth.types.js';
import { db } from '../../db/index.js'
import { users } from '../../db/schema.js'
import { eq } from 'drizzle-orm'
import jwt  from 'jsonwebtoken'

export async function signup(req: Request<{},{}, SignupBody>, res: Response): Promise<void> {
	console.log('BODY:', req.body);
	const { email, password } = req.body;

	const passCheck = passwordSecurity(password);
	if (!passCheck.valid) {
		res.status(400).json({error: passCheck.error});
		return;
	}

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

	if (!email || !password) {
		res.status(400).json({error: 'Email and password are required'});
		return;
	}

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

	const accessToken = generateAccessToken({userId: user.id, email: user.email});
	const refreshToken = generateRefreshToken({userId: user.id, email: user.email});
	res.status(200).json({
		id: user.id,
		email: user.email,
		accessToken,
		refreshToken })
}

export async function getMe(req: Request, res: Response): Promise<void> {
	const user = (req as any).user;
	res.status(200).json({ user });
}

export async function refresh(req: Request, res: Response): Promise<void> {
	const { userId, email } = (req as any).user;
	const newAccessToken = generateAccessToken({userId, email}) // non rotation for refresh token
	res.status(200).json({accessToken: newAccessToken})
}