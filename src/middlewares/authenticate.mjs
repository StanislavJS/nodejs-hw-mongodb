import jwt from "jsonwebtoken";
import createHttpError from "http-errors";
import User from "../models/User.mjs";
import Session from "../models/Session.mjs";

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";
    if (!authHeader) throw createHttpError(401, "Unauthorized");

    const [bearer, token] = authHeader.split(" ");
    if (bearer !== "Bearer" || !token) {
      throw createHttpError(401, "Unauthorized");
    }

    let payload;
    try {
      payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        throw createHttpError(401, "Access token expired");
      }
      throw createHttpError(401, "Invalid token");
    }

    //userId + token
    const session = await Session.findOne({
      userId: payload.id,
      accessToken: token,
    });
    if (!session) {
      throw createHttpError(401, "Session expired or invalid");
    }

    const user = await User.findById(payload.id).select("_id name email");
    if (!user) throw createHttpError(401, "User not found");

    req.user = {
      _id: user._id,
      name: user.name,
      email: user.email,
    };

    next();
  } catch (err) {
    next(err);
  }
};
