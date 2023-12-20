import express from "express";
import { register } from "../controllers/userController.js";

const router = express.Router();

// User registration route
router.post("/register", register);

export default router;
