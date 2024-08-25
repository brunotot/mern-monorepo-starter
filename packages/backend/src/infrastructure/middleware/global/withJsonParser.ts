/**
 * @packageDocumentation Middleware which parses incoming requests with JSON payloads and is based on body-parser.
 */

import { type RouteMiddlewareFactory } from "@org/backend/config/singletons/RouterCollection";
import express from "express";

export const withJsonParser: RouteMiddlewareFactory = () => {
  return express.json();
};
