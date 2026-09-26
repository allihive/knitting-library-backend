import { Router } from "express";
import { createYarn, getAllYarn, getYarn } from "./yarn.controller";
import { authenticateToken } from "../auth/auth.middleware";

const router = Router();

router.post('/', authenticateToken, createYarn);
router.get('/', authenticateToken, getAllYarn);
router.get('/:id', authenticateToken, getYarn);

export default router