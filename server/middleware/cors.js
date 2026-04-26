import { env } from "../config/env.js";

export function corsMiddleware(req, res, next) {
  if (!env.clientOrigin) {
    next();
    return;
  }

  res.setHeader("Access-Control-Allow-Origin", env.clientOrigin);
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");

  if (req.method === "OPTIONS") {
    res.sendStatus(204);
    return;
  }

  next();
}
