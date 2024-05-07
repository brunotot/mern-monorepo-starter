/**
 * @packageDocumentation Middleware which enables credentials for cross-origin requests.
 */

import { RouteMiddleware } from "@org/backend/types";
import type { RequestHandler } from "express";

const VAR_ALLOWED_ORIGINS = [
  "http://127.0.0.1:5500",
  "http://localhost:3000",
  "http://localhost:5173",
];

export function withCredentials(): RequestHandler {
  return (req, res, next) => {
    const origin = req.headers.origin;
    if (origin && VAR_ALLOWED_ORIGINS.includes(origin)) {
      res.header("Access-Control-Allow-Credentials", "true");
    }
    next();
  };
}

/** @hidden */
export const withCredentialsMiddleware: RouteMiddleware = withCredentials();
