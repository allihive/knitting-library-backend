import { Router } from 'express'
import { authenticateToken } from '../auth/auth.middleware'
import { createPattern } from './patterns.controller'

const router = Router();

router.post('/',authenticateToken, createPattern);

export default router;