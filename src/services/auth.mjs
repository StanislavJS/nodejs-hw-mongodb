// src/services/auth.mjs
import bcrypt from "bcryptjs";
import createHttpError from "http-errors";
import User from "../models/User.mjs";
import Session from "../models/Session.mjs";
import { generateTokens } from "../utils/generateTokens.mjs";
import jwt from "jsonwebtoken";

export const register = async ({ name, email, password }) => {
  const existing = await User.findOne({ email });
  if (existing) throw createHttpError(409, "Email in use");

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed });

  const { password: _, ...userData } = user.toObject();

  return userData;
};

export const login = async ({ email, password }) => {
  if (!email || !password) throw createHttpError(400, "Missing email or password");

  const user = await User.findOne({ email });
  if (!user) throw createHttpError(401, "Invalid credentials");

  const matched = await bcrypt.compare(password, user.password);
  if (!matched) throw createHttpError(401, "Invalid credentials");

  
  const { accessToken, refreshToken, accessTokenValidUntil, refreshTokenValidUntil } =
    generateTokens(user._id);

 
  await Session.deleteMany({ userId: user._id });

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
  } catch (err) {
    throw createHttpError(401, "Invalid refresh token");
  }


  const session = await Session.findOne({ refreshToken: oldRefreshToken });
  if (!session) throw createHttpError(401, "Invalid refresh token");

  
  const { accessToken, refreshToken, accessTokenValidUntil, refreshTokenValidUntil } =
    generateTokens(payload.id);


  session.accessToken = accessToken;
  session.refreshToken = refreshToken;
  session.accessTokenValidUntil = accessTokenValidUntil;
  session.refreshTokenValidUntil = refreshTokenValidUntil;
  await session.save();

  return { accessToken, refreshToken };
};

export const logout = async (oldRefreshToken) => {
  if (!oldRefreshToken) throw createHttpError(401, "No refresh token");

  const session = await Session.findOne({ refreshToken: oldRefreshToken });
  if (!session) {
    
    return;
  }

  await Session.deleteOne({ _id: session._id });
};
