/**
 * @packageDocumentation HTTP request logger middleware for NodeJS.
 * @see {@link https://www.npmjs.com/package/morgan|npm specifics}
 */

import { RequestHandler } from "express";
import morgan from "morgan";
import { $BackendAppConfig, stream } from "../../../config";

export function withMorgan(): RequestHandler {
  return morgan($BackendAppConfig.env.LOG_FORMAT, { stream });
}

/** @hidden */
export const withMorganMiddleware = withMorgan();
