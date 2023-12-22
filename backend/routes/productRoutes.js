import express from "express";
import {
  createProduct,
  getAllProducts,
} from "../controllers/productController.js";
import { authoriseAdmin, isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

// Create Product --Admin
router.post("/product/new", isAuthenticated, authoriseAdmin, createProduct);

// Get All Product
router.get("/products", getAllProducts);

export default router;
