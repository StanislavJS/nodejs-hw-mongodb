// src/controllers/auth/sendResetEmail.mjs
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import createHttpError from "http-errors";
import * as userService from "../../services/user.mjs";

export const sendResetEmailController = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      throw createHttpError(400, "Email is required.");
    }

    const user = await userService.findByEmail(email);
    if (!user) {
      throw createHttpError(404, "User not found!");
    }

    // JWT for password reset (valid 5 min)
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "5m" });
    const resetLink = `${process.env.APP_DOMAIN}/reset-password?token=${encodeURIComponent(token)}`;


    const canSendEmail =
      process.env.SMTP_HOST &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASSWORD &&
      process.env.SMTP_FROM &&
      process.env.RENDER !== "true";

    if (!canSendEmail) {
      console.warn("⚠️ SMTP not configured or Render environment — returning reset link for testing:");
      console.warn(resetLink);

      return res.status(200).json({
        status: 200,
        message: "Simulated reset email (SMTP not configured or Render environment).",
        data: { resetLink },
      });
    }

    const transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

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
               style="display:inline-block;padding:10px 20px;background:#007bff;color:#fff;text-decoration:none;border-radius:5px;">
              Reset Password
            </a>
            <p>If you didn’t request this, please ignore this email.</p>
          </div>
        `,
      });
    } catch (err) {
      console.error("❌ Failed to send email:", err.message);
      throw createHttpError(500, "Failed to send the email, please try again later.");
    }

    res.status(200).json({
      status: 200,
      message: "Reset password email has been successfully sent.",
      data: {},
    });
  } catch (error) {
    next(error);
  }
};
