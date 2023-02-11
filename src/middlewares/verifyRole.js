// import jwt from "jsonwebtoken";
import { ErrorHandler } from "../exceptions/ErrorHandler.js";

export const verifyRole = (role) => {
  return (req, res, next) => {
    const { userRole } = req;
    const { path } = req.cookies;

    if (role.toLowerCase() != userRole) {
      return next(
        new ErrorHandler("Bu vazifani bajarishga ruxsat berilmagan", 401)
      );
    }
    next();
  };
};
