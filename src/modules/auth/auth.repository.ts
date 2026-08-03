import { db } from "../../db";
import { users } from "../../db/schema";	
import { eq } from "drizzle-orm";

export async function findUserByEmail(email: string) {
	return db.query.users.findFirst({
		where: eq(users.username, email),
	});
}

export async function createUser(username: string, passwordHash: string) {
	const[user] = await db.insert(users).values({
		username,
		passwordHash,
	}).returning();
	return user;
}
