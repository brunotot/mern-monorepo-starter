/**
 * @packageDocumentation Connect/Express middleware that can be used to enable CORS with various options.
 * @see {@link https://www.npmjs.com/package/cors|npm specifics}
 * @see {@link https://en.wikipedia.org/wiki/Cross-origin_resource_sharing|cors wiki}
 */

import cors from "cors";
import { RequestHandler } from "express";
import { $BackendAppConfig } from "../../../config";

export function withCors(): RequestHandler {
  return cors({
    origin: $BackendAppConfig.env.ORIGIN,
    credentials: $BackendAppConfig.env.CREDENTIALS === "true",
  });
}

/** @hidden */
export const withCorsMiddleware = withCors();
