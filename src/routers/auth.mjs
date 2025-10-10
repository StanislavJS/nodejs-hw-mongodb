import { Router } from "express";
import {
  registerController,
  loginController,
  refreshController,
  logoutController,
  sendResetEmailController,
  resetPasswordController,
} from "../controllers/auth.mjs";

import { validateBody } from "../middlewares/validateBody.mjs";
import {
  registerSchema,
  loginSchema,
  emailSchema,
  resetPasswordSchema,
} from "../validation/authSchemas.mjs";

const router = Router();

// ✅ Реєстрація нового користувача
router.post("/register", validateBody(registerSchema), registerController);

// ✅ Авторизація користувача
router.post("/login", validateBody(loginSchema), loginController);

// ✅ Оновлення токена доступу
router.post("/refresh", refreshController);

// ✅ Вихід користувача
router.post("/logout", logoutController);

// ✅ Надсилання листа для відновлення пароля
router.post("/send-reset-email", validateBody(emailSchema), sendResetEmailController);

// ✅ Скидання пароля за допомогою токена
router.post("/reset-pwd", validateBody(resetPasswordSchema), resetPasswordController);

export default router;
