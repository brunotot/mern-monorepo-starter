/**
 * @packageDocumentation Middleware which parses incoming requests with JSON payloads and is based on body-parser.
 */

import express, { RequestHandler } from "express";

export function withJsonParser(): RequestHandler {
  return express.json();
}

/** @hidden */
export const withJsonParserMiddleware = withJsonParser();
