// src/validation/authSchemas.mjs
import Joi from "joi";

// ✅ Схема реєстрації користувача
export const registerSchema = Joi.object({
  name: Joi.string().min(1).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

// ✅ Схема входу (login)
export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// ✅ Схема для надсилання листа скидання паролю
export const emailSchema = Joi.object({
  email: Joi.string().email().required(),
});

// ✅ Схема для маршруту /auth/reset-pwd
export const resetPasswordSchema = Joi.object({
  token: Joi.string().required(),
  password: Joi.string().min(6).required(),
});
