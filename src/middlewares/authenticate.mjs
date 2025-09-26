import jwt from "jsonwebtoken";
import createHttpError from "http-errors";
import User from "../models/User.mjs";

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) throw createHttpError(401, "No token provided");

    const [bearer, token] = authHeader.split(" ");
    if (bearer !== "Bearer" || !token) throw createHttpError(401, "Invalid token");

    let payload;
    try {
      payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        throw createHttpError(401, "Access token expired");
      } else {
        throw createHttpError(401, "Invalid token");
      }
    }

    const user = await User.findById(payload.id).select("_id name email");
    if (!user) throw createHttpError(401, "User not found");

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};
