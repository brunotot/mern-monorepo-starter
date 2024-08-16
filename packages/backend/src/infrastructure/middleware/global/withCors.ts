/**
 * @packageDocumentation Connect/Express middleware that can be used to enable CORS with various options.
 * @see {@link https://www.npmjs.com/package/cors|npm specifics}
 * @see {@link https://en.wikipedia.org/wiki/Cross-origin_resource_sharing|cors wiki}
 */

import { Environment } from "@org/backend/config/singletons/Environment";
import { type RouteMiddleware } from "@org/backend/config/singletons/RouterCollection";
import cors from "cors";
import type { RequestHandler } from "express";

export function withCors(): RequestHandler {
  const { ORIGIN, CREDENTIALS } = Environment.getInstance().vars;
  return cors({
    origin: ORIGIN,
    credentials: CREDENTIALS === "true",
  });
}

/** @hidden */
export const withCorsMiddleware: RouteMiddleware = withCors();
