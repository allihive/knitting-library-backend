import { describe, it, vi, expect } from 'vitest'
import type { Request, Response } from 'express'

//mock db module before importing controller
vi.mock('../../../db/index', () => ({
	db: {
		select: vi.fn(), //fake function
		insert: vi.fn()
	},
}))

import { db } from '../../../db/index'
import { login } from '../auth.controller'
import { beforeEach } from 'node:test'

function mockResponse(): Response {
	const res:any = {};
	res.status = vi.fn().mockReturnValue(res);
	res.json = vi.fn().mockReturnValue(res);
	return res;

}

describe('login', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	})
	it('returns 401 when user does not exist', async () => {
		(db.select as any).mockReturnValue({
			from: () => ({
				where: () => Promise.resolve([]),
			})
		})
		const req = { body: { email: 'nouser@example.com', password: 'pass'} } as Request;
		const res = mockResponse();

		await login(req as any, res);
		expect(res.status).toHaveBeenCalledWith(401);
	})
	it('Returns 400 when email input is empty', async () => {
		const req = { body: {email: '', password: 'randompassword'} } as Request;
		const res = mockResponse();

		await login(req as any, res);
		expect(res.status).toHaveBeenCalledWith(400);
		expect(res.json).toHaveBeenCalledWith({error: 'Email and password are required'})
		expect(db.select).not.toHaveBeenCalled();
	})
	it ('Returns 400 when password input is empty', async () => {
		const req = { body: { email: 'someemail@email.com', password: ''} } as Request;
		const res = mockResponse();

		await login(req as any, res);

		expect(res.status).toHaveBeenCalledWith(400);
		expect(res.json).toHaveBeenCalledWith({error:'Email and password are required'});
		expect(db.select).not.toHaveBeenCalled();
	})
})


/*
  it('returns 200 with user data on successful login', async () => {
    const fakeUser = {
      id: '123',
      email: 'test@example.com',
      passwordHash: await (await import('./auth.service.js')).hashPassword('correctpass'),
    };

    (db.select as any).mockReturnValue({
      from: () => ({
        where: () => Promise.resolve([fakeUser]),
      }),
    });

    const req = { body: { email: 'test@example.com', password: 'correctpass' } } as Request;
    const res = mockResponse();

    await login(req as any, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ id: fakeUser.id, email: fakeUser.email });
  });

  import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../db/index.js', () => ({
  db: { insert: vi.fn() },
}));

import { db } from '../../db/index.js';
import { signup } from './auth.controller.js';

function mockResponse() {
  const res: any = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
}

describe('signup', () => {
  beforeEach(() => vi.clearAllMocks());

  it('stores a hashed password, not the plain password', async () => {
    const valuesMock = vi.fn().mockReturnValue({
      returning: () => Promise.resolve([{ id: '1', email: 'test@example.com' }]),
    });
    (db.insert as any).mockReturnValue({ values: valuesMock });

    const req = { body: { email: 'test@example.com', password: 'plainpassword123' } } as any;
    const res = mockResponse();

    await signup(req, res);

    // grab what was actually passed to db.insert().values(...)
    const insertedData = valuesMock.mock.calls[0][0];

    expect(insertedData.passwordHash).toBeDefined();
    expect(insertedData.passwordHash).not.toBe('plainpassword123'); // not stored in plain text
    expect(insertedData.email).toBe('test@example.com');
  });
});
});*/