/// <reference types="@types/jest" />

// @ts-ignore
import server from "../../dist/server";

import { DatabaseManager } from "../../dist/config/managers/DatabaseManager";

beforeAll(async () => {
  await server.prepare();
  globalThis.expressApp = server.expressApp;
});

afterAll(async () => {
  delete globalThis.expressApp;
});

beforeEach(async () => {
  await DatabaseManager.getInstance().startTransaction();
});

afterEach(async () => {
  await DatabaseManager.getInstance().rollbackTransaction();
});
