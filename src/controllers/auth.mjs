// src/controllers/auth.mjs
import * as authService from "../services/auth.mjs";
import createHttpError from "http-errors";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 30 * 24 * 60 * 60 * 1000,
};

export const registerController = async (req, res, next) => {
  try {
    const user = await authService.register(req.body);
    res.status(201).json({
      status: 201,
      message: "User registered",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

export const loginController = async (req, res, next) => {
  try {
    const { accessToken, refreshToken } = await authService.login(req.body);

    
    res.cookie("accessToken", accessToken, cookieOptions);
    res.cookie("refreshToken", refreshToken, cookieOptions);

    res.status(200).json({
      status: 200,
      message: "Successfully logged in a user!",
      data: { accessToken }, 
    });
  } catch (err) {
    next(err);
  }
};

export const refreshController = async (req, res, next) => {
  try {
    const oldToken = req.cookies.refreshToken;
    const { accessToken, refreshToken } = await authService.refresh(oldToken);

    res.cookie("accessToken", accessToken, cookieOptions);
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

export const logoutController = async (req, res, next) => {
  try {
    const oldToken = req.cookies.refreshToken;
    await authService.logout(oldToken);

 
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

   
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
