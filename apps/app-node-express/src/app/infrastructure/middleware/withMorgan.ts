/**
 * @packageDocumentation HTTP request logger middleware for NodeJS.
 * @see {@link https://www.npmjs.com/package/morgan|npm specifics}
 */

import type { RouteMiddlewareFactory } from "@/lib/@ts-rest";
import type { RequestHandler } from "express";
import morgan from "morgan";
import { IocRegistry, inject } from "@/lib/ioc";
import { createStream, log } from "@/lib/winston";

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
