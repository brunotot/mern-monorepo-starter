/**
 * @packageDocumentation HTTP request logger middleware for NodeJS.
 * @see {@link https://www.npmjs.com/package/morgan|npm specifics}
 */

import { VAR_ZOD_ENVIRONMENT, stream } from "@internal";
import type { RequestHandler } from "express";
import morgan from "morgan";

export function withMorgan(): RequestHandler {
  return morgan(VAR_ZOD_ENVIRONMENT.LOG_FORMAT, { stream });
}

/** @hidden */
export const withMorganMiddleware = withMorgan();
