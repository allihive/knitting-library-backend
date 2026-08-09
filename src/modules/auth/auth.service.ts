const bcrypt = require('bcrypt');

export async function hashPassword(plainPassword: string): Promise<string> {
	return bcrypt.hash(plainPassword, 12);
}

export async function verifyPassword(plainPassword:string, hash:string ): Promise<boolean> {
	return bcrypt.compare(plainPassword, hash);
}
