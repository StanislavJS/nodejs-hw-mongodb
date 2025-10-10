// src/controllers/auth/resetPassword.mjs
import jwt from "jsonwebtoken";
import createHttpError from "http-errors";
import * as authService from "../../services/auth.mjs";
import * as userService from "../../services/user.mjs"; // переконайся, що такий сервіс є для роботи з User

export const resetPasswordController = async (req, res, next) => {
  try {
    const { token, password } = req.body;

    // 1️⃣ Перевірка, що обидва поля є
    if (!token || !password) {
      throw createHttpError(400, "Token and password are required.");
    }

    // 2️⃣ Валідація токена
    let payload;
    try {
      payload = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      throw createHttpError(401, "Token is expired or invalid.");
    }


    // 3️⃣ Пошук користувача за email
    const user = await userService.findByEmail(payload.email);
    if (!user) {
      throw createHttpError(404, "User not found!");
    }

    // 4️⃣ Оновлення паролю через сервіс
    try {
      await authService.updatePassword(user._id, password);
    } catch (err) {
      throw createHttpError(500, "Failed to reset the password, please try again later.");
    }

    // 5️⃣ Видалення поточних сесій користувача
    await authService.deleteUserSessions(user._id);

    // 6️⃣ Відповідь успішна
    res.status(200).json({
      status: 200,
      message: "Password has been successfully reset.",
      data: {},
    });
  } catch (err) {
    next(err);
  }
};
