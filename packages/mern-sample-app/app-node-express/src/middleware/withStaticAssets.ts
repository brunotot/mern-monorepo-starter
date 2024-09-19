/**
 * @packageDocumentation Middleware which serves static and public files from assets directory..
 */

import type { RouteMiddlewareFactory } from "@org/app-node-express/lib/@ts-rest";

import { env } from "@org/app-node-express/env";
import express from "express";

export function withStaticAssets(): RouteMiddlewareFactory {
  return () => [express.static(env.SERVER_ASSETS_URI)];
}
