import Joi from "joi";

export const LoginValidation = Joi.object().keys({
  userName: Joi.string().required(),
  password: Joi.string().required(),
});
