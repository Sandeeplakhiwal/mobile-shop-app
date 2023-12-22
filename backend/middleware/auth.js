import { User } from "../models/userModel.js";
import { catchAsycnError } from "../utils/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import jwt, { decode } from "jsonwebtoken";

export const isAuthenticated = catchAsycnError(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) return next(new ErrorHandler("Not Logged In!", 401));
  const decoded = await jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded._id);
  next();
});

export const authoriseAdmin = catchAsycnError(async (req, res, next) => {
  if (req.user?.role === "User") {
    return next(
      new ErrorHandler(
        `${req.user.role} is not allowed to access this route`,
        403
      )
    );
  }
  next();
});
