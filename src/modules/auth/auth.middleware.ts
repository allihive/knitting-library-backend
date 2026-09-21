import type { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

console.log('AUTH MIDDLEWARE FILE LOADED');

export function authenticateToken(req: Request, res: Response, next: NextFunction): void {
	console.log('authenticateToken called');
	const authHeader = req.headers.authorization;
	console.log('authHeader:', authHeader);
	const token = authHeader && authHeader.split(' ')[1]; //"Bearer <token>"
	console.log('extracted token:', token);

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
		return
	}
}

export function authenticateRefreshToken(req: Request, res: Response, next: NextFunction): void {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    res.status(401).json({ error: 'Refresh token required' });
    return;
  }

  try {
    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!);
    (req as any).user = payload;
    next();
  } catch (err) {
    res.status(403).json({ error: 'Invalid or expired refresh token' });
    return;
  }
}