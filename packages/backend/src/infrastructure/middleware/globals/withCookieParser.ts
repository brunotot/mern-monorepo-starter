/**
 * @packageDocumentation Middleware which parses Cookie header and populates req.cookies with an object keyed by the cookie names.
 * @see {@link https://www.npmjs.com/package/cookie-parser|npm specifics}
 */

import { RouteMiddleware } from "@org/backend/types";
import cookieParser from "cookie-parser";
import type { RequestHandler } from "express";

export function withCookieParser(): RequestHandler {
  return cookieParser();
}

/** @hidden */
export const withCookieParserMiddleware: RouteMiddleware = withCookieParser();
