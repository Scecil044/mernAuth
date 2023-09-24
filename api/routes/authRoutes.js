import express from "express";
import { register, login, googleAuth, logout } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/google", googleAuth);
router.get("/logout", logout);

export default router;
