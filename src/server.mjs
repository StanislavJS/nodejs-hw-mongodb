import express from "express";
import cors from "cors";
import pino from "pino-http";
import cookieParser from "cookie-parser";

import contactsRouter from "./routers/contacts.mjs";
import authRouter from "./routers/auth.mjs";
import { authenticate } from "./middlewares/authenticate.mjs";
import { notFoundHandler } from "./middlewares/notFoundHandler.mjs";
import { errorHandler } from "./middlewares/errorHandler.mjs";
import docsRouter from "./routers/docs.mjs";
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import path from 'path';

const swaggerPath = path.resolve('./docs/swagger.json');
const swaggerDocument = JSON.parse(fs.readFileSync(swaggerPath, 'utf-8'));


export const setupServer = () => {
  const app = express();

  // Swagger UI setup

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(3000, () => console.log('Docs: http://localhost:3000/api-docs'));


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

  app.use("/api-docs", docsRouter);

  
  return app;
};
