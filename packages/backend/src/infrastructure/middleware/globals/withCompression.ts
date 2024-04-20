/**
 * @packageDocumentation Provides response compression middleware to optimize client-server communication, supporting deflate, gzip, and custom compression configurations.
 * @see {@link https://www.npmjs.com/package/compression|npm specifics}
 */

import compression from "compression";
import { RequestHandler } from "express";

export function withCompression(): RequestHandler {
  return compression();
}

/** @hidden */
export const withCompressionMiddleware = withCompression();
