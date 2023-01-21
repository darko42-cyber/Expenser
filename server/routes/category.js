import { Router } from "express";

import passport from "passport";
import * as Category from "../controllers/Category.js";
const router = Router();

router.delete("/:id", Category.destroy);

export default router;
