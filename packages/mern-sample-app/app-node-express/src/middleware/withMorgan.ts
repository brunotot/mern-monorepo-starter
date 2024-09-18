/**
 * @packageDocumentation HTTP request logger middleware for NodeJS.
 * @see {@link https://www.npmjs.com/package/morgan|npm specifics}
 */

import type { RouteMiddlewareFactory } from "@org/app-node-express/lib/@ts-rest";
import type { StreamOptions } from "morgan";
import type * as Winston from "winston";

import { testMode } from "@org/app-node-express/env";
import { log } from "@org/app-node-express/logger";
import morgan from "morgan";

function createStream(logger: Winston.Logger): StreamOptions {
  return {
    write: (msg: string) => logger.info(msg.substring(0, msg.lastIndexOf("\n"))),
  };
}

export const withMorgan: RouteMiddlewareFactory = () => {
  if (testMode()) return (_req, _res, next) => next();
  return morgan("dev", { stream: createStream(log) });
};
