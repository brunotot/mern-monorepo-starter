/**
 * @packageDocumentation Provides response compression middleware to optimize client-server communication, supporting deflate, gzip, and custom compression configurations.
 * @see {@link https://www.npmjs.com/package/compression|npm specifics}
 */

import { type RouteMiddlewareFactory } from "@org/backend/config/Route.config";
import compression from "compression";

export const withCompression: RouteMiddlewareFactory = () => {
  return compression();
};
