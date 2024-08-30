/**
 * @packageDocumentation HTTP request logger middleware for NodeJS.
 * @see {@link https://www.npmjs.com/package/morgan|npm specifics}
 */

import type { StreamOptions } from "morgan";
import type * as Winston from "winston";
import morgan from "morgan";
import { env } from "@org/app-node-express/setup/env.setup";
import { log } from "@org/app-node-express/setup/log.setup";
import { type RouteMiddlewareFactory } from "@org/app-node-express/config/Route.config";

function createStream(logger: Winston.Logger): StreamOptions {
  return {
    write: (msg: string) => logger.info(msg.substring(0, msg.lastIndexOf("\n"))),
  };
}

export const withMorgan: RouteMiddlewareFactory = () => {
  if (env.NODE_ENV === "test") {
    return (req, res, next) => next();
  }

  return morgan("dev", { stream: createStream(log) });
};
