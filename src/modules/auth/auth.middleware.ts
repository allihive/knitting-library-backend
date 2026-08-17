import type { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export function authenticateToken(req: Request, res: Response, next: NextFunction): void {
	const authHeader = req.headers.authorization;
	const token = authHeader && authHeader.split(' ')[1]; //"Bearer <token>"

	if (!token) {
		res.status(401).json({error: 'Access token required'});
		return;
	}
	try {
		const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET!);
		(req as any).user = payload; //decoded user info into request
		next(); // proceed to actual route handler
	} catch (err) {
		res.status(403).json({error: 'Invalid or expired token'});
		console.error('JWT VERIFY ERROR:', err); 
		return
	}
}