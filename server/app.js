import express from "express";
import { env } from "./config/env.js";
import { corsMiddleware } from "./middleware/cors.js";
import { errorHandler } from "./middleware/errorHandler.js";
import demoRequestRoutes from "./routes/demoRequestRoutes.js";

const app = express();

app.use(express.json());
app.use(corsMiddleware);

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    service: "avail-api",
    port: env.port,
    integrations: {
      googleSheets: Boolean(
        env.googleSheetsSpreadsheetId &&
          env.googleServiceAccountEmail &&
          env.googleServiceAccountPrivateKey,
      ),
      email: Boolean(
        env.mailHost &&
          env.mailPort &&
          env.mailUser &&
          env.mailPass &&
          env.mailFrom &&
          env.teamNotificationEmails.length,
      ),
    },
  });
});

app.use("/api/demo-requests", demoRequestRoutes);
app.use(errorHandler);

export default app;
