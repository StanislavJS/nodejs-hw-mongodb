import * as authService from "../services/auth.mjs";
import createHttpError from "http-errors";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 30 * 24 * 60 * 60 * 1000,
};

// REGISTER 
export const registerController = async (req, res, next) => {
  try {
    const { user } = await authService.register(req.body);
    res.status(201).json({
      status: 201,
      message: "Successfully registered a user!",
      data: user, 
    });
  } catch (err) {
    next(err);
  }
};

// LOGIN
export const loginController = async (req, res, next) => {
  try {
    const { accessToken, refreshToken } = await authService.login(req.body);

    res.cookie("refreshToken", refreshToken, cookieOptions);

    res.status(200).json({
      status: 200,
      message: "Successfully logged in an user!",
      data: { accessToken },
    });
  } catch (err) {
    next(err);
  }
};

// REFRESH
export const refreshController = async (req, res, next) => {
  try {
    const oldToken = req.cookies.refreshToken;
    if (!oldToken) throw createHttpError(401, "No refresh token provided");

    const { accessToken, refreshToken } = await authService.refresh(oldToken);

    res.cookie("refreshToken", refreshToken, cookieOptions);

    res.status(200).json({
      status: 200,
      message: "Successfully refreshed a session!",
      data: { accessToken },
    });
  } catch (err) {
    next(err);
  }
};

// LOGOUT
export const logoutController = async (req, res, next) => {
  try {
    const oldToken = req.cookies.refreshToken;
    if (!oldToken) throw createHttpError(401, "No refresh token provided");

    await authService.logout(oldToken);

    res.clearCookie("refreshToken");

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
