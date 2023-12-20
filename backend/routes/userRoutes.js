import express from "express";
import { login, logout, register } from "../controllers/userController.js";

const router = express.Router();

// User registration route
router.post("/register", register);

// User login route
router.post("/login", login);

// User logout route
router.get("/logout", logout);

export default router;
