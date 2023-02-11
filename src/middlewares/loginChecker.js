import { ErrorHandler } from "../exceptions/ErrorHandler.js";

export const loginChecker = (req, res, next) => {
  if (req.cookies["token"]) {
    return next(new ErrorHandler("Allaqachon tizimga kirgansiz"));
  }
  next();
};
