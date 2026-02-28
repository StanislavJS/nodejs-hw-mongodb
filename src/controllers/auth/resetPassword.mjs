// src/controllers/auth/resetPassword.mjs
import jwt from "jsonwebtoken";
import createHttpError from "http-errors";
import * as authService from "../../services/auth.mjs";
import * as userService from "../../services/user.mjs";

export const resetPasswordController = async (req, res, next) => {
  try {
    const { token, password } = req.body;

    
    if (!token || !password) {
      throw createHttpError(400, "Token and password are required.");
    }

  
    let payload;
    try {
      payload = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      throw createHttpError(401, "Token is expired or invalid.");
    }


    
    const user = await userService.findByEmail(payload.email);
    if (!user) {
      throw createHttpError(404, "User not found!");
    }


    try {
      await authService.updatePassword(user._id, password);
    } catch (err) {
      throw createHttpError(500, "Failed to reset the password, please try again later.");
    }

    await authService.deleteUserSessions(user._id);

    
    res.status(200).json({
      status: 200,
      message: "Password has been successfully reset.",
      data: {},
    });
  } catch (err) {
    next(err);
  }
};
