/**
 * @packageDocumentation Middleware which enables credentials for cross-origin requests.
 */

import { env } from "@org/backend/setup/env.setup";
import { type RouteMiddlewareFactory } from "@org/backend/config/Route.config";

export const withCredentials: RouteMiddlewareFactory = () => {
  return (req, res, next) => {
    const origin = req.headers.origin;
    if (origin && env.ALLOWED_ORIGINS.includes(origin)) {
      res.header("Access-Control-Allow-Credentials", "true");
    }
    next();
  };
};
