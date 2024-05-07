/**
 * @packageDocumentation Middleware to protect against HTTP Parameter Pollution attacks.
 * @see {@link https://www.npmjs.com/package/hpp|npm specifics}
 * @see {@link https://en.wikipedia.org/wiki/HTTP_parameter_pollution|http parameter pollution wiki}
 */

import { RouteMiddleware } from "@org/backend/types";
import type { RequestHandler } from "express";
import hpp from "hpp";

export function withHpp(): RequestHandler {
  return hpp();
}

/** @hidden */
export const withHppMiddleware: RouteMiddleware = withHpp();
