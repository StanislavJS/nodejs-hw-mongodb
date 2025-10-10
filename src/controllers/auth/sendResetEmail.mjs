// src/controllers/auth/sendResetEmail.mjs
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import createHttpError from "http-errors";
import * as userService from "../../services/user.mjs";

export const sendResetEmailController = async (req, res, next) => {
  try {
    const { email } = req.body;

    // 1️⃣ Перевірка введених даних
    if (!email) {
      throw createHttpError(400, "Email is required.");
    }

    // 2️⃣ Перевіряємо, чи існує користувач
    const user = await userService.findByEmail(email);
    if (!user) {
      throw createHttpError(404, "User not found!");
    }

    // 3️⃣ Створюємо JWT токен для reset-password
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "5m" });

    // 4️⃣ Перевірка SMTP-конфігурації
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASSWORD || !process.env.SMTP_FROM) {
      throw createHttpError(500, "SMTP configuration is missing.");
    }

    // 5️⃣ Налаштування транспорту
    const transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });


    // 6️⃣ Посилання з токеном
    const resetLink = `http://localhost:3000/reset-password?token=${encodeURIComponent(token)}`;

    
    // 7️⃣ Надсилаємо лист
    try {
      await transport.sendMail({
        from: process.env.SMTP_FROM,
        to: email,
        subject: "Password Reset Request",
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6;">
            <h2>Password Reset Request</h2>
            <p>You requested a password reset. Click the button below to set a new password:</p>
            <a href="${resetLink}" 
               style="display: inline-block; padding: 10px 20px; background: #007bff; color: #fff; text-decoration: none; border-radius: 5px;">
              Reset Password
            </a>
            <p>If you didn’t request this, please ignore this email.</p>
          </div>
        `,
      });
    } catch (err) {
      throw createHttpError(500, "Failed to send the email, please try again later.");
    }

    // 8️⃣ Відповідь
    res.status(200).json({
      status: 200,
      message: "Reset password email has been successfully sent.",
      data: {},
    });
  } catch (error) {
    next(error);
  }
};
