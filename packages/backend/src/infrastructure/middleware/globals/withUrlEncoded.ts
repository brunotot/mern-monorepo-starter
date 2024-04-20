/**
 * @packageDocumentation Middleware which only parses urlencoded bodies and only looks at requests where the Content-Type header matches the type option.
 */

import express, { RequestHandler } from "express";

export function withUrlEncoded(): RequestHandler {
  return express.urlencoded({ extended: true });
}

/** @hidden */
export const withUrlEncodedMiddleware = withUrlEncoded();
