/**
 * @packageDocumentation Middleware which serves static and public files from assets directory..
 */

import { type RouteMiddlewareFactory } from "@org/backend/config/Route.config";
import express from "express";

export const withStaticAssets: RouteMiddlewareFactory = () => {
  return express.static("assets");
};
