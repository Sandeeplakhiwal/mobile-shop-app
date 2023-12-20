import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import Validator from "validator";
import bcrypt from "bcryptjs";

const schema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
    maxLength: [30, "Name cannot exceed30 characters"],
    minLength: [3, "Name should have at least three characters"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    validate: [Validator.isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    maxLength: [30, "Password cannot exceed 50 characters"],
    minLength: [6, "Password should have at least 8 characters"],
    select: false,
  },
  role: {
    type: String,
    default: "User",
  },
  resetPasswordTokenString: String,
  resetPasswordExpire: Date,
});

// Hashing Password
schema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// JWT Token
schema.methods.generateToken = async function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Compare Password
schema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

export const User = new mongoose.model("User", schema);
