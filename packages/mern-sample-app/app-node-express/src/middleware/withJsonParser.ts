/**
 * @packageDocumentation Middleware which parses incoming requests with JSON payloads and is based on body-parser.
 */

import type { RouteMiddlewareFactory } from "@org/app-node-express/lib/@ts-rest";

import express from "express";

export const withJsonParser: RouteMiddlewareFactory = () => {
  return express.json();
};
