import jwt from "jsonwebtoken";
import { ErrorHandler } from "../exceptions/ErrorHandler.js";

export const verifyToken = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Provide token", 401));
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decode) => {
    if (err instanceof jwt.JsonWebTokenError) {
      return next(new ErrorHandler("Invalid token", 401));
    }
    req.userId = decode.id;
    req.userRole = decode.role;
    next();
  });
};
