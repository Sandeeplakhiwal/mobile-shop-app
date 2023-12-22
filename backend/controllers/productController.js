import { Product } from "../models/productModel.js";
import { ApiFeatures } from "../utils/apiFeatures.js";
import { catchAsycnError } from "../utils/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";

// Create product
export const createProduct = catchAsycnError(async (req, res, next) => {
  const {
    name,
    description,
    price,
    images,
    processor,
    memory,
    os,
    category,
    stock,
  } = req.body;
  if (
    !name ||
    !description ||
    !price ||
    !images ||
    !category ||
    !stock ||
    !memory ||
    !os ||
    !processor
  ) {
    return next(
      new ErrorHandler(
        "Please enter all fields containing name, description, price, images, processor, memory, os, category, stock.",
        400
      )
    );
  }
  const data = {
    name,
    description,
    price,
    images,
    processor,
    memory,
    os,
    category,
    stock,
    user: req.user._id,
  };
  const product = await Product.create(data);
  res.status(201).json({
    success: true,
    message: "Product added successfully",
    product,
  });
});

export const getAllProducts = catchAsycnError(async (req, res, next) => {
  const productCount = await Product.countDocuments();
  const apiFeature = new ApiFeatures(Product.find(), req.query);
  apiFeature.search().filter();
  const products = await apiFeature.query;
  return res.status(200).json({
    success: true,
    productCount,
    products,
  });
});
