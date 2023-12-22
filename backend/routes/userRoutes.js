import express from "express";
import {
  getMyProfile,
  login,
  logout,
  register,
  updateProfileRole,
} from "../controllers/userController.js";
import { authoriseAdmin, isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

// User registration route
router.post("/register", register);

// User login route
router.post("/login", login);

// User logout route
router.get("/logout", logout);

// Update Profile Role --Admin
router.put(
  "/admin/update-role/:id",
  isAuthenticated,
  authoriseAdmin,
  updateProfileRole
);

router.get("/me", isAuthenticated, getMyProfile);

export default router;
