import type express from "express";

export function app(): express.Application {
  // @ts-ignore
  return globalThis.expressApp;
}
