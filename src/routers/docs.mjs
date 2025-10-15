// src/routers/docs.mjs
import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import path from "path";

const router = Router();

const swaggerFilePath = path.resolve(process.cwd(), "docs/swagger.json");

if (fs.existsSync(swaggerFilePath)) {
  const swaggerDocument = JSON.parse(fs.readFileSync(swaggerFilePath, "utf8"));
  router.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
} else {
  router.get("/", (req, res) => {
    res.status(404).json({ status: 404, message: "Swagger JSON not found. Run npm run build-docs", data: null });
  });
}

export default router;
