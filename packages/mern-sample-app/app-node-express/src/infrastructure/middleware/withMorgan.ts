/**
 * @packageDocumentation HTTP request logger middleware for NodeJS.
 * @see {@link https://www.npmjs.com/package/morgan|npm specifics}
 */

import type { RouteMiddlewareFactory } from "@org/app-node-express/lib/@ts-rest";
import type { RequestHandler } from "express";
import type { StreamOptions } from "morgan";
import type * as Winston from "winston";

import { inject } from "@org/app-node-express/infrastructure/decorators";
import { IocRegistry } from "@org/app-node-express/lib/bottlejs";
import { log } from "@org/app-node-express/logger";
import morgan from "morgan";

function createStream(logger: Winston.Logger): StreamOptions {
  return {
    write: (msg: string) => logger.info(msg.substring(0, msg.lastIndexOf("\n"))),
  };
}

export interface MorganMiddleware {
  middleware(): RequestHandler[];
}

const IOC_KEY = "withMorgan";

@inject(IOC_KEY)
export class WithMorgan implements MorganMiddleware {
  middleware(): RequestHandler[] {
    return [morgan("dev", { stream: createStream(log) })];
  }
}

export function withMorgan(): RouteMiddlewareFactory {
  return () => IocRegistry.getInstance().inject<MorganMiddleware>(IOC_KEY).middleware();
}
