import express from "express";
import cors from "cors";
import pino from "pino-http";
import cookieParser from "cookie-parser";

import contactsRouter from "./routers/contacts.mjs";
import authRouter from "./routers/auth.mjs";
import { authenticate } from "./middlewares/authenticate.mjs";
import { notFoundHandler } from "./middlewares/notFoundHandler.mjs";
import { errorHandler } from "./middlewares/errorHandler.mjs";

export const setupServer = () => {
  const app = express();

  app.use(cors());
  app.use(pino());
  app.use(express.json());
  app.use(cookieParser());

  // Health-check
  app.get("/", (req, res) => {
    res.json({ message: "Hello from API" });
  });

  // Auth routes
  app.use("/auth", authRouter);

  // Contacts routes
  app.use("/contacts", authenticate, contactsRouter);

  // Not found
  app.use(notFoundHandler);

  // Error handler
  app.use(errorHandler);

  return app;
};
