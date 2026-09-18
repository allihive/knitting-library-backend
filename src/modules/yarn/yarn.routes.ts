import { Router } from "express";
import { createYarn } from "./yarn.controller";
import { authenticateToken } from "../auth/auth.middleware";

const router = Router();

router.post('/', authenticateToken, createYarn,);

export default router