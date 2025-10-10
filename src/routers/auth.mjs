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

router.post("/register", validateBody(registerSchema), registerController);

router.post("/login", validateBody(loginSchema), loginController);

router.post("/refresh", refreshController);

router.post("/logout", logoutController);

router.post("/send-reset-email", validateBody(emailSchema), sendResetEmailController);

router.post("/reset-pwd", validateBody(resetPasswordSchema), resetPasswordController);

export default router;
