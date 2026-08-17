import express from 'express'
import { signup, login, getMe, refresh } from "./auth.controller"
import { authenticateRefreshToken, authenticateToken } from './auth.middleware';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/me', authenticateToken, getMe);
router.post('/refresh', authenticateRefreshToken, refresh);

export default router;