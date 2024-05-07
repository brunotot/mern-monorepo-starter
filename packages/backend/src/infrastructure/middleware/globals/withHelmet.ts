/**
 * @packageDocumentation Middleware which helps secure Express apps by setting HTTP response headers.
 * @see {@link https://www.npmjs.com/package/helmet|npm specifics}
 */

import { RouteMiddleware } from "@org/backend/types";
import type { RequestHandler } from "express";
import helmet from "helmet";

export function withHelmet(): RequestHandler {
  return helmet();
}

/** @hidden */
export const withHelmetMiddleware: RouteMiddleware = withHelmet();
