/**
 * @packageDocumentation Connect/Express middleware that can be used to enable CORS with various options.
 * @see {@link https://www.npmjs.com/package/cors|npm specifics}
 * @see {@link https://en.wikipedia.org/wiki/Cross-origin_resource_sharing|cors wiki}
 */

import { VAR_ZOD_ENVIRONMENT } from "@internal";
import cors from "cors";
import type { RequestHandler } from "express";

export function withCors(): RequestHandler {
  return cors({
    origin: VAR_ZOD_ENVIRONMENT.ORIGIN,
    credentials: VAR_ZOD_ENVIRONMENT.CREDENTIALS === "true",
  });
}

/** @hidden */
export const withCorsMiddleware = withCors();
