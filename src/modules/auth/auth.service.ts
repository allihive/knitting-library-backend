import bcrypt from 'bcrypt'

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
	if (plainPassword.length > 128) {
		return ({valid: false, error: 'Password must be less than 128 characters'});
	}
	return ({valid: true});
}