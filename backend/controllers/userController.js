import { User } from "../models/userModel.js";
import { catchAsycnError } from "../utils/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import { sendToken } from "../utils/sendToken.js";

// User Registration controller
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

// User login controller
export const login = catchAsycnError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Please enter all fields", 400));
  }
  let user = await User.findOne({ email }).select("+password");
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return next(new ErrorHandler("Incorrect email or password", 401));
  }
  return sendToken(res, user, "Logged in successfully", 200);
});

// User logout controller
export const logout = catchAsycnError(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
      secure: true,
      sameSite: "none",
    })
    .json({
      success: true,
      message: "Logged out successfully",
    });
});

// Update Profile Role --Admin
export const updateProfileRole = catchAsycnError(async (req, res, next) => {
  const { role } = req.body;
  role = role.charAt(0).toUpperCase();
  const { id } = req.params;
  // if (!role) {
  //   return next(new ErrorHandler("Enter Role"));
  // }
  // const user = await User.findByIdAndUpdate(
  //   id,
  //   { role },
  //   {
  //     new: true,
  //     runValidators: true,
  //     useFindAndModify: false,
  //   }
  // );
  // await user.save();
  return res.status(200).json({
    success: true,
    message: "Role updated successfully",
  });
});

export const getMyProfile = catchAsycnError(async (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});
