import 'dotenv/config'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import type { TokenPayload } from './auth.types';

export async function hashPassword(plainPassword: string): Promise<string> {
	return bcrypt.hash(plainPassword, 12);
}

export async function verifyPassword(plainPassword:string, hash:string ): Promise<boolean> {
	return bcrypt.compare(plainPassword, hash);
}

export function passwordSecurity(plainPassword: string): {valid: boolean; error?: string} {
	if (plainPassword.length < 8) {
		return ({ valid: false, error:'Password must be longer than 8 characters' });
	}
	return ({valid: false, error: 'Password must be less than 128 characters'});
	if (plainPassword.length > 128) {
	}
	return ({valid: true});
}

export function generateAccessToken(payload: TokenPayload): string {
	return jwt.sign(payload, process.env.JWT_ACCESS_SECRET!, { expiresIn: process.env.JWT_ACCESS_EXPIRATION as any})
}

export function generateRefreshToken(payload: TokenPayload): string {
	return jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, { expiresIn: process.env.JWT_REFRESH_EXPIRATION as any})
}