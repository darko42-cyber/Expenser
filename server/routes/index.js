import { Router } from "express";
import passport from "passport";
const router = Router();

import transactionRoute from "./transactions.js";
import authRoute from "./auth.js";
import userRoute from "./user.js";
import categoryRoute from "./category.js";

const auth = passport.authenticate("jwt", { session: false });
router.use("/transaction", auth, transactionRoute);
router.use("/auth", authRoute);
router.use("/user", userRoute);
router.use("/category", auth, categoryRoute);

export default router;
