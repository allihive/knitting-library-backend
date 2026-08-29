import type { Request, Response } from 'express';
import { generateAccessToken, generateRefreshToken, hashPassword, passwordSecurity, verifyPassword } from './auth.service.js'
import type { SignupBody, LoginBody, GoogleLoginBody } from './auth.types.js';
import { db } from '../../db/index.js'
import { users } from '../../db/schema.js'
import { eq } from 'drizzle-orm'
import { OAuth2Client } from 'google-auth-library';

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export async function signup(req: Request<{},{}, SignupBody>, res: Response): Promise<void> {
	console.log('BODY:', req.body);
	const { email, password } = req.body;

	const passCheck = passwordSecurity(password);
	if (!passCheck.valid) {
		res.status(400).json({error: passCheck.error});
		return;
	}

	const [existingUser] = await db.select().from(users).where(eq(users.email, email));
	if (existingUser) {
		res.status(409).json({error: 'email already in use'})
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

export async function googleLogin(req: Request<{}, {}, GoogleLoginBody>, res: Response): Promise<void> {
	const { credential } = req.body;

	if(!credential) {
		res.status(400).json({error: 'Google credential is required'});
		return;
	}
	const clientId = process.env.GOOGLE_CLIENT_ID;
	if (!clientId) {
		res.status(500).json({error: 'server misconfiguration: missing Google client ID'});
		return;
	}

	try {
		const ticket = await googleClient.verifyIdToken({
			idToken: credential,
			audience: clientId,
		});
		const payload = ticket.getPayload();

		if (!payload || !payload.email) {
			res.status(401).json({error: 'Invalid Google token'});
			return;
		}

		const email = payload?.email;
		let [user] = await db.select().from(users).where(eq(users.email, email));

		if (!user) {
			[user] = await db
			.insert(users)
			.values({ email, passwordHash: null})
			.returning()
		}

		if (!user) {
			res.status(500).json({error: 'Failed to create user'});
			return;
		}

		const accessToken = generateAccessToken({ userId: user.id, email: user.email });
		const refreshToken = generateRefreshToken({ userId: user.id, email: user.email });

		res.status(200).json({
			id: user.id,
			email: user.email,
			accessToken,
			refreshToken
		})
	} catch (err) {
		res.status(401).json({error: 'Google authentication failed'})
	}
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