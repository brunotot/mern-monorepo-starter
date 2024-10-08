import type express from "express";

import supertest from "supertest";

export function getApp(): express.Application {
  // @ts-ignore
  return globalThis.expressApp;
}

export function cleanup() {
  // @ts-ignore
  delete globalThis.expressApp;
}

export function setApp(app: express.Application) {
  // @ts-ignore
  globalThis.expressApp = app;
}

export function request() {
  return supertest(getApp());
}
