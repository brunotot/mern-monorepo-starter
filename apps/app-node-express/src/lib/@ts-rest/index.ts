/**
 * @packageDocumentation
 *
 * ## Overview
 * This module provides functionality for defining and managing routes within an Express application using `@ts-rest`.
 * It includes utilities for initializing routes and Swagger documentation, as well as a service for managing and adding routers
 * with customizable middleware. The `TsRestRouterService` acts as a singleton, ensuring consistent management of all defined routes and their middleware.
 *
 * ## Features
 * - Initialize Express routes using `@ts-rest`.
 * - Build and serve Swagger documentation with customizable OAuth2 redirect, CSS, and JS paths.
 * - Define routes with associated handlers and middleware using the `TsRestRouterService`.
 * - Manage routes and middleware dynamically, allowing for easy extension and configuration.
 * - Suppresses console logs during endpoint creation for cleaner output.
 *
 * ## How to Use
 *
 * ### Initialize Express Routes
 * ```ts
 * import { initializeExpressRoutes } from "@/lib/@ts-rest";
 * import express from "express";
 *
 * const app = express();
 * initializeExpressRoutes(app);
 * ```
 *
 * ### Initialize Swagger Documentation
 * ```ts
 * import { initializeSwagger } from "@/lib/@ts-rest";
 *
 * initializeSwagger({
 *   app,
 *   oauth2RedirectUrl: "/oauth2-redirect",
 *   version: "1.0.0",
 *   cssPath: "/css/swagger.css",
 *   jsPath: "/js/swagger.js",
 *   endpoint: "/api-docs",
 * });
 * ```
 *
 * ### Add Routers and Middleware
 * ```ts
 * import { TsRestRouterService } from "@/lib/@ts-rest";
 *
 * const routerService = TsRestRouterService.getInstance();
 * routerService.addRouter(someRouteContract, handler, [someMiddlewareFactory]);
 * const routers = routerService.getRouters();
 * ```
 */

export * from "@/lib/@ts-rest/TsRestRouterService";
export * from "@/lib/@ts-rest/TsRestExpressRouteTypes";
export * from "@/lib/@ts-rest/TsRestExpressService";
export * from "@/lib/@ts-rest/TsRestContractHandler";
