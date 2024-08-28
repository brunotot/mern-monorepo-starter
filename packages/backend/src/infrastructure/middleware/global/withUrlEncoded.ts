/**
 * @packageDocumentation Middleware which only parses urlencoded bodies and only looks at requests where the Content-Type header matches the type option.
 */

import { type RouteMiddlewareFactory } from "@org/backend/config/Route.config";
import express from "express";

export const withUrlEncoded: RouteMiddlewareFactory = () => {
  return express.urlencoded({ extended: true });
};
