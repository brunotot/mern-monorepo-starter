/// <reference types="@types/jest" />

import { startup } from "../../dist/startup";
import { MongoDatabaseService } from "../../dist/lib/mongodb/MongoDatabaseService";
import __mocks__ from "../__mocks__";

beforeAll(async () => {
  await startup(__mocks__, server => (globalThis.expressApp = server.expressApp), false);
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
