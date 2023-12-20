import ErrorHandler from "../utils/errorHandler.js";

const ErrorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal server error";

  // Wrong mongodb id error
  if (err.name === "CastError") {
    const message = `Resourse not found ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  //   Jwt Expire error
  if (err.name === "TokenExpiredError") {
    const message = `Json web token is expired, try again later`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    error: err.message,
  });
};

export default ErrorMiddleware;
