import { describe, it, expect } from "vitest"
import { hashPassword, verifyPassword } from "../auth.service"

//unit tests
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

describe('verifyPassword', () => {
	it('returns true for correct password', async () => {
		const hash = await hashPassword('mypassword123');
		const check = await verifyPassword('mypassword123', hash);
		expect(check).toBe(true)
	})
	it ('returns false for incorrect password', async () => {
		const hash = await hashPassword('mypassword123');
		const result = await verifyPassword('hithere123', hash);
		expect(result).toBe(false)
	})
})