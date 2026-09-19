import { Router } from "express"
import { createTool } from "./tools.controller";
import { authenticateToken } from "../auth/auth.middleware"

const router = Router();

router.post('/', authenticateToken, createTool);

export default router