/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * @packageDocumentation Provides a middleware factory to serve static assets from the file system.
 * @see {@link https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/express/index.d.ts#L50 express.static()}
 * @why Serves static files (e.g., images, stylesheets, and scripts) from the specified directory, ensuring that assets are correctly accessible in the application.
 */

import type { RouteMiddlewareFactory } from "@org/app-node-express/lib/@ts-rest";
import type { middleware } from "@org/app-node-express/middleware/index";

import fs from "fs";
import path from "path";

import { env } from "@org/app-node-express/server/env";
import express from "express";

/**
 * Provides a middleware factory to serve static assets from the file system.
 * @returns Express middleware factory
 * @see {@link middleware All global middleware}
 */
export function withStaticAssets(): RouteMiddlewareFactory {
  return () => {
    const staticPath = path.resolve(env.SERVER_ASSETS_URI);
    if (!fs.existsSync(staticPath))
      throw new Error(`Static assets directory does not exist: ${staticPath}`);
    return [express.static(staticPath)];
  };
}
