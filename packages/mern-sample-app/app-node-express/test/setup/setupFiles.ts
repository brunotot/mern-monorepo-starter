/// <reference types="@types/jest" />

import { MongoDatabaseService } from "../../dist/lib/mongodb/MongoDatabaseService";
import { initServer } from "../../dist/initServer";
import __mocks__ from "../__mocks__";
import { initServer } from "@ts-rest/express";

beforeAll(async () => {
  const server = await initServer({
    mocks: __mocks__,
  });
  globalThis.expressApp = server.expressApp;
});

afterAll(async () => {
  delete globalThis.expressApp;
});

beforeEach(() => {
  const dbManager = MongoDatabaseService.getInstance();
  dbManager.testSession = dbManager.client.startSession();
  dbManager.testSession.startTransaction();
});

afterEach(async () => {
  const dbManager = MongoDatabaseService.getInstance();
  await dbManager.testSession.abortTransaction();
  await dbManager.testSession.endSession();
});
