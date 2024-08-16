/**
 * @packageDocumentation Middleware which only parses urlencoded bodies and only looks at requests where the Content-Type header matches the type option.
 */

import { type RouteMiddleware } from "@org/backend/config/singletons/RouterCollection";
import type { RequestHandler } from "express";
import express from "express";

export function withUrlEncoded(): RequestHandler {
  return express.urlencoded({ extended: true });
}

/** @hidden */
export const withUrlEncodedMiddleware: RouteMiddleware = withUrlEncoded();
