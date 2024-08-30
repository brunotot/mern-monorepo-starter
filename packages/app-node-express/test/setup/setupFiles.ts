/// <reference types="@types/jest" />

import { server } from "../../dist/setup/server.setup";
import { DatabaseManager } from "../../dist/config/DatabaseManager.config";
import __mocks__ from "../__mocks__";

beforeAll(async () => {
  await server.init(__mocks__);
  globalThis.expressApp = server.expressApp;
});

afterAll(async () => {
  delete globalThis.expressApp;
});

beforeEach(() => {
  const dbManager = DatabaseManager.getInstance();
  dbManager.testSession = dbManager.client.startSession();
  dbManager.testSession.startTransaction();
});

afterEach(async () => {
  const dbManager = DatabaseManager.getInstance();
  await dbManager.testSession.abortTransaction();
  await dbManager.testSession.endSession();
});
