import { Router } from "express";
import passport from "passport";
import * as Transaction from "../controllers/transaction.js";
const router = new Router();

router.get("/", Transaction.index);
router.post("/", Transaction.create);

router.delete("/:id", Transaction.destroy);
router.patch("/:id", Transaction.update);

export default router;
