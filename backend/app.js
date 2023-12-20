import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import ErrorMiddleware from "./middleware/error.js";

const app = express();

dotenv.config({
  path: "./config/.env",
});

// Using Middlewares
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Mobiles Shopping app");
});

// Importing routes
import userRoutes from "./routes/userRoutes.js";

// Using routes
app.use("/api/v1", userRoutes);

// Middleware for errors
app.use(ErrorMiddleware);

export default app;
