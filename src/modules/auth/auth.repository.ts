import { db } from "../../db/index";
import { users } from "../../db/schema";	
import { eq } from "drizzle-orm";

export async function findUserByEmail(email: string) {
	return db.query.users.findFirst({
		where: eq(users.id, email),
	});
}

export async function createUser(email: string, passwordHash: string) {
	const[user] = await db.insert(users).values({
		email,
		passwordHash,
	}).returning();
	return user;
}
