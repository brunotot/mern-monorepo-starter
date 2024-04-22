/**
 * @packageDocumentation HTTP request logger middleware for NodeJS.
 * @see {@link https://www.npmjs.com/package/morgan|npm specifics}
 */

import { Environment, Logger } from "@internal";
import type { RequestHandler } from "express";
import morgan from "morgan";

export function withMorgan(): RequestHandler {
  const stream = Logger.getInstance().stream;
  return morgan(Environment.getInstance().vars.LOG_FORMAT, { stream });
}

/** @hidden */
export const withMorganMiddleware = withMorgan();
