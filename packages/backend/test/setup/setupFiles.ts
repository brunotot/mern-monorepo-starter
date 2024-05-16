/// <reference types="@types/jest" />

// @ts-ignore
import "./../../dist/index";
// @ts-ignore
import app from "../../dist/server";
// @ts-ignore
import { ServiceRegistry } from "../../dist/config/singletons/ServiceRegistry";

beforeAll(async () => {
  ServiceRegistry.getInstance().iocStartup();
  const MockApp = app;
  await MockApp.listen();
  globalThis.app = MockApp.app;
});

afterAll(async () => {
  delete globalThis.app;
});
