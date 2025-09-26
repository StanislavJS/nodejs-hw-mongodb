import bcrypt from "bcryptjs";
import createHttpError from "http-errors";
import User from "../models/User.mjs";
import Session from "../models/Session.mjs";
import { generateTokens } from "../utils/generateTokens.mjs";

export const register = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) throw createHttpError(409, "Email already in use");

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword });

  const { accessToken, refreshToken } = generateTokens(user._id);

  await Session.create({
    userId: user._id,
    accessToken,
    refreshToken,
  });

  return { accessToken, refreshToken };
};

export const login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw createHttpError(401, "Invalid credentials");

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw createHttpError(401, "Invalid credentials");

  await Session.deleteMany({ userId: user._id }); 

  const { accessToken, refreshToken } = generateTokens(user._id);

  await Session.create({
    userId: user._id,
    accessToken,
    refreshToken,
  });

  return { accessToken, refreshToken };
};

export const refresh = async (oldRefreshToken) => {
  if (!oldRefreshToken) throw createHttpError(401, "No refresh token");

  const session = await Session.findOne({ refreshToken: oldRefreshToken });
  if (!session) throw createHttpError(401, "Invalid refresh token");

  await Session.deleteOne({ _id: session._id });

  const { accessToken, refreshToken } = generateTokens(session.userId);

  await Session.create({
    userId: session.userId,
    accessToken,
    refreshToken,
  });

  return { accessToken, refreshToken };
};

export const logout = async (oldRefreshToken) => {
  if (!oldRefreshToken) throw createHttpError(401, "No refresh token");

  await Session.deleteOne({ refreshToken: oldRefreshToken });
};
