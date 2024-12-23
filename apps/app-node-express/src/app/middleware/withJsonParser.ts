/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * @packageDocumentation Provides a middleware factory to parse incoming JSON request bodies.
 * @see {@link https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/express/index.d.ts#L26 express.json()}
 * @why Allows the application to automatically parse and handle JSON payloads from incoming HTTP requests.
 */

import type { middleware } from "@/app/middleware/index";
import type { RouteMiddlewareFactory } from "@/lib/@ts-rest";
import express from "express";

/**
 * Provides a middleware factory to parse incoming JSON request bodies.
 * @returns Express middleware factory
 * @see {@link middleware All global middleware}
 */
export function withJsonParser(): RouteMiddlewareFactory {
  return () => [express.json()];
}
