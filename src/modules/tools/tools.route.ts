import { Router } from "express"
import { createTool, updateTool, getTool, getAllTools, deleteTool } from "./tools.controller";
import { authenticateToken } from "../auth/auth.middleware"


const router = Router();

router.post('/', authenticateToken, createTool);
router.get('/', authenticateToken, getAllTools);
router.get('/:id', authenticateToken, getTool);
router.patch('/:id', authenticateToken, updateTool);
router.delete('/:id', authenticateToken, deleteTool);


export default router