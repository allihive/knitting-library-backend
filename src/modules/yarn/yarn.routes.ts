import { Router } from "express";
import { createYarn, deleteYarn, getAllYarn, getYarn, updateYarn } from "./yarn.controller";
import { authenticateToken } from "../auth/auth.middleware";

const router = Router();

router.post('/', authenticateToken, createYarn);
router.get('/', authenticateToken, getAllYarn);
router.get('/:id', authenticateToken, getYarn);
router.patch('/:id', authenticateToken, updateYarn);
router.delete('/:id', authenticateToken, deleteYarn);


export default router