import { Router } from "express";

const router = Router();
import * as Auth from "../controllers/auth.js";

router.post("/register", Auth.register);

router.post("/login", Auth.login);

export default router;
