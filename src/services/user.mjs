// src/services/user.mjs
import User from "../models/User.mjs";

export const findByEmail = async (email) => {
  const user = await User.findOne({ email });
  return user;
};

