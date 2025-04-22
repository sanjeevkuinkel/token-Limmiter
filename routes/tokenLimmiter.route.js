import express from "express";
import tokenLimmiter from "../services/tokenLimmiter.route.js";
const router = express.Router();
router.post("/limit/token", tokenLimmiter);
export default router;
