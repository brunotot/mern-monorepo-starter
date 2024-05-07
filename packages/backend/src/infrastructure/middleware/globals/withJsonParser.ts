/**
 * @packageDocumentation Middleware which parses incoming requests with JSON payloads and is based on body-parser.
 */

import { RouteMiddleware } from "@org/backend/types";
import type { RequestHandler } from "express";
import express from "express";

export function withJsonParser(): RequestHandler {
  return express.json();
}

/** @hidden */
export const withJsonParserMiddleware: RouteMiddleware = withJsonParser();
