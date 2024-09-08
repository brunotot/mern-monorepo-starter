/**
 * @packageDocumentation Middleware which enables credentials for cross-origin requests.
 */

import { env } from "@org/app-node-express/env";
import { type RouteMiddlewareFactory } from "@org/app-node-express/lib/@ts-rest";

export const withCredentials: RouteMiddlewareFactory = () => {
  return (req, res, next) => {
    const origin = req.headers.origin;
    if (origin && env.ALLOWED_ORIGINS.includes(origin)) {
      res.header("Access-Control-Allow-Credentials", "true");
    }
    next();
  };
};
