import type { ExpressApp } from "@/server/ExpressApp";
import type express from "express";

import supertest from "supertest";

export function getServer(): ExpressApp {
  // @ts-ignore
  return globalThis.server;
}

export function setServer(server: ExpressApp) {
  // @ts-ignore
  globalThis.server = server;
}

export function getApp(): express.Application {
  // @ts-ignore
  return globalThis.expressApp;
}

export function setApp(app: express.Application) {
  // @ts-ignore
  globalThis.expressApp = app;
}

export function cleanup() {
  // @ts-ignore
  delete globalThis.expressApp;
  // @ts-ignore
  delete globalThis.server;
}

export function request() {
  return supertest(getApp());
}
