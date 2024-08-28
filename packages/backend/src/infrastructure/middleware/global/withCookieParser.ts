/**
 * @packageDocumentation Middleware which parses Cookie header and populates req.cookies with an object keyed by the cookie names.
 * @see {@link https://www.npmjs.com/package/cookie-parser|npm specifics}
 */

import { type RouteMiddlewareFactory } from "@org/backend/config/Route.config";
import cookieParser from "cookie-parser";

export const withCookieParser: RouteMiddlewareFactory = () => {
  return cookieParser();
};
