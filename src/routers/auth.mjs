// src/routers/auth.mjs
import { Router } from "express";
import {
  registerController,
  loginController,
  refreshController,
  logoutController,
} from "../controllers/auth.mjs";
import { validateBody } from "../middlewares/validateBody.mjs";
import { registerSchema, loginSchema } from "../validation/contactsSchemas.mjs";

const router = Router();

router.post("/register", validateBody(registerSchema), registerController);
router.post("/login", validateBody(loginSchema), loginController);
router.post("/refresh", refreshController);
router.post("/logout", logoutController);

export default router;
