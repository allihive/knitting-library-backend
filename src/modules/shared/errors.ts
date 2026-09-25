export class NotFoundError extends Error {
	constructor(message = 'Resource not found') {
		super(message);
		this.name = 'NotFoundError';
	}
}

//extends creates its own class like error, but own distinct type