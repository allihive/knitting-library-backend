import express from 'express'
import { signup, login, getMe } from "./auth.controller"
import { authenticateToken } from './auth.middleware';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/me', authenticateToken, getMe)

export default router;