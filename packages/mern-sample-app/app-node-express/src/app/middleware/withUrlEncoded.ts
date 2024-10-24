/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * @packageDocumentation Provides a middleware factory to parse URL-encoded request bodies.
 * @see {@link https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/express/index.d.ts#L56 express.urlencoded()}
 * @why Allows the application to handle form submissions and other URL-encoded payloads by automatically parsing the request bodies.
 */

import type { middleware } from "@org/app-node-express/app/middleware/index";
import type { RouteMiddlewareFactory } from "@org/app-node-express/lib/@ts-rest";

import express from "express";

/**
 * Provides a middleware factory to parse URL-encoded request bodies.
 * @returns Express middleware factory
 * @see {@link middleware All global middleware}
 */
export function withUrlEncoded(): RouteMiddlewareFactory {
  return () => [express.urlencoded({ extended: true })];
}
