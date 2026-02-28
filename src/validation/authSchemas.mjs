// src/validation/authSchemas.mjs
import Joi from "joi";

// register
export const registerSchema = Joi.object({
  name: Joi.string().min(1).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

// login
export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// /auth/send-reset-email
export const emailSchema = Joi.object({
  email: Joi.string().email().required(),
});

// /auth/reset-pwd
export const resetPasswordSchema = Joi.object({
  token: Joi.string().required(),
  password: Joi.string().min(6).required(),
});
