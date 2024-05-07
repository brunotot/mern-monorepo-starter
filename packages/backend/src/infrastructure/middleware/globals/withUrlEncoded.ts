/**
 * @packageDocumentation Middleware which only parses urlencoded bodies and only looks at requests where the Content-Type header matches the type option.
 */

import { RouteMiddleware } from "@org/backend/types";
import type { RequestHandler } from "express";
import express from "express";

export function withUrlEncoded(): RequestHandler {
  return express.urlencoded({ extended: true });
}

/** @hidden */
export const withUrlEncodedMiddleware: RouteMiddleware = withUrlEncoded();
