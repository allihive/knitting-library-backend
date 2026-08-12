import { describe, it, expect } from "vitest"
import { hashPassword, verifyPassword } from "./auth.service"

describe ('hashPassword', () => {
	it('produces a has different from the plain password', async () => {
		const hash = await hashPassword('mypassword123');
		expect(hash).not.toBe('mypassword123');
	})
	it('produces a different hash each time because of the random salt', async () => {
		const hash1 = await hashPassword('mypassword123');
		const hash2 = await hashPassword('mypassword123');
		expect(hash1).not.toBe(hash2);
	})
})
