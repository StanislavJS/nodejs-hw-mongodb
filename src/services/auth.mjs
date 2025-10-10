import bcrypt from "bcryptjs";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";

import User from "../models/User.mjs";
import Session from "../models/Session.mjs";
import { generateTokens } from "../utils/generateTokens.mjs";

export const register = async ({ name, email, password }) => {
  const existing = await User.findOne({ email });
  if (existing) throw createHttpError(409, "Email in use");

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed });

  return {
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
  };
};

export const login = async ({ email, password }) => {
  if (!email || !password) throw createHttpError(400, "Missing email or password");

  const user = await User.findOne({ email });
  if (!user) throw createHttpError(401, "Invalid credentials");

  const matched = await bcrypt.compare(password, user.password);
  if (!matched) throw createHttpError(401, "Invalid credentials");

  await Session.deleteMany({ userId: user._id });

  const {
    accessToken,
    refreshToken,
    accessTokenValidUntil,
    refreshTokenValidUntil,
  } = generateTokens(user._id);

  await Session.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil,
    refreshTokenValidUntil,
  });

  return { accessToken, refreshToken };
};

export const refresh = async (oldRefreshToken) => {
  if (!oldRefreshToken) throw createHttpError(401, "No refresh token");

  let payload;
  try {
    payload = jwt.verify(oldRefreshToken, process.env.JWT_REFRESH_SECRET);
  } catch {
    throw createHttpError(401, "Invalid refresh token");
  }

  const oldSession = await Session.findOne({ refreshToken: oldRefreshToken });
  if (!oldSession) throw createHttpError(401, "Invalid session or token");

  await Session.deleteOne({ _id: oldSession._id });

  const {
    accessToken,
    refreshToken,
    accessTokenValidUntil,
    refreshTokenValidUntil,
  } = generateTokens(payload.id);

  await Session.create({
    userId: payload.id,
    accessToken,
    refreshToken,
    accessTokenValidUntil,
    refreshTokenValidUntil,
  });

  return { accessToken, refreshToken };
};

export const logout = async (oldRefreshToken) => {
  if (!oldRefreshToken) throw createHttpError(401, "No refresh token");

  await Session.findOneAndDelete({ refreshToken: oldRefreshToken });

  return { message: "Logged out successfully" };
};

//reset-password

export const updatePassword = async (userId, newPassword) => {
  const user = await User.findById(userId);
  if (!user) throw createHttpError(404, "User not found");

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  await user.save();

  return user;
};

export const deleteUserSessions = async (userId) => {
  await Session.deleteMany({ userId });
};
