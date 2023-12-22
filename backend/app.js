import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import ErrorMiddleware from "./middleware/error.js";
import Cors from "cors";

const app = express();

dotenv.config({
  path: "./config/.env",
});

// Using Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  Cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.get("/", (req, res) => {
  res.send("Mobiles Shopping app");
});

// Importing routes
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";

// Using routes
app.use("/api/v1", userRoutes);
app.use("/api/v1", productRoutes);

// Middleware for errors
app.use(ErrorMiddleware);

export default app;
