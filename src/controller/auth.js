import { LoginValidation } from "../validation/validation.js";
import { read } from "../utils/FS.js";
import { ErrorHandler } from "../exceptions/ErrorHandler.js";
import { sign } from "../utils/jwt.js";

export const login = async (req, res, next) => {
  const { error, value } = LoginValidation.validate(req.body);

  if (error) {
    return next(new ErrorHandler(error.message, 400));
  }
  const { userName, password } = value;

  const allUsers = await read("users.model.json");

  const foundUser = allUsers?.find(
    (e) => e.userName == userName && e.password == password
  );

  if (!foundUser) {
    return next(new ErrorHandler("User not found", 404));
  }

  if (foundUser.role == "admin") {
    res.cookie("token", sign({ id: foundUser?.id, role: foundUser?.role }));
    res.redirect("/admins");
    return;
  }

  if (foundUser.role == "student") {
    res.cookie("token", sign({ id: foundUser?.id, role: foundUser?.role }));
    res.redirect("/personal/student");
    return;
  }

  if (foundUser.role == "teacher") {
    res.cookie("token", sign({ id: foundUser?.id, role: foundUser?.role }));
    res.redirect("/personal/teacher");
    return;
  }
};

export const getLogin = (req, res, next) => {
  res.render("login.ejs");
};
