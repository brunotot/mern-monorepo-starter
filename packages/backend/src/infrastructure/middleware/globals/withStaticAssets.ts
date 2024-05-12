/**
 * @packageDocumentation Middleware which serves static and public files from assets directory..
 */

import { type RouteMiddleware } from "@org/backend/types";
import type { RequestHandler } from "express";
import express from "express";

export function withStaticAssets(): RequestHandler {
  return express.static("assets");
}

/** @hidden */
export const withStaticAssetsMiddleware: RouteMiddleware = withStaticAssets();
