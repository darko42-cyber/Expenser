import { Router } from "express";

import passport from "passport";
import * as User from "../controllers/user.js";
const router = Router();

router.get("/", passport.authenticate("jwt", { session: false }), User.index);

export default router;
