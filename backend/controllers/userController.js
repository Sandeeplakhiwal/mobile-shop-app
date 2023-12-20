import { User } from "../models/userModel.js";
import { catchAsycnError } from "../utils/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import { sendToken } from "../utils/sendToken.js";

export const register = catchAsycnError(async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return next(new ErrorHandler("Please enter all fields", 400));
  }
  let user = await User.findOne({ email });
  if (user) {
    return next(
      new ErrorHandler("User already exist with this email address.", 409)
    );
  }
  user = await User.create({
    name,
    email,
    password,
  });
  return sendToken(res, user, "Registered successfully", 201);
});
