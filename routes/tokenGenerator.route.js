import express from "express";
import generateToken from "../services/tokenGenerator.service.js";
const router = express.Router();
router.post("/generate/token", generateToken);
export default router;
