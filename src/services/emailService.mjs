import nodemailer from "nodemailer";
import createHttpError from "http-errors";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export const sendResetPasswordEmail = async (to, resetLink) => {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to,
      subject: "Password Reset Request",
      html: `
        <p>Hello!</p>
        <p>You requested to reset your password. Click the link below to continue:</p>
        <a href="${resetLink}" target="_blank">${resetLink}</a>
        <p>This link will expire in 5 minutes.</p>
      `,
    });
  } catch (err) {
    console.error("Email send error:", err);
    throw createHttpError(500, "Failed to send the email, please try again later.");
  }
};
