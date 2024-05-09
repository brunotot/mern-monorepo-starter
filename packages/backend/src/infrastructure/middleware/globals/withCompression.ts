/**
 * @packageDocumentation Provides response compression middleware to optimize client-server communication, supporting deflate, gzip, and custom compression configurations.
 * @see {@link https://www.npmjs.com/package/compression|npm specifics}
 */

import type { RouteMiddleware } from "@org/backend/types";
import compression from "compression";
import type { RequestHandler } from "express";

export function withCompression(): RequestHandler {
  return compression();
}

/** @hidden */
export const withCompressionMiddleware: RouteMiddleware = withCompression();
