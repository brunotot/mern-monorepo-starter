/**
 * @packageDocumentation Middleware which parses incoming requests with JSON payloads and is based on body-parser.
 */

import { type RouteMiddleware } from "@org/backend/config/singletons/RouterCollection";
import type { RequestHandler } from "express";
import express from "express";

export function withJsonParser(): RequestHandler {
  return express.json();
}

/** @hidden */
export const withJsonParserMiddleware: RouteMiddleware = withJsonParser();
