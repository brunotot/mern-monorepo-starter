import { MongoDatabaseService } from "@org/lib-mongodb";
import __mocks__ from "../config/__mocks__";
import { cleanup, setApp } from "./../config/utils";
import { initServer } from "@/server/initServer";

beforeAll(async () => {
  const server = await initServer({
    mocks: __mocks__,
  });
  setApp(server.expressApp);
});

afterAll(async () => {
  cleanup();
});

beforeEach(() => {
  const dbManager = MongoDatabaseService.getInstance();
  //console.log(dbManager);
  dbManager.testSession = dbManager.client.startSession();
  dbManager.testSession.startTransaction();
});

afterEach(async () => {
  const dbManager = MongoDatabaseService.getInstance();
  await dbManager.testSession.abortTransaction();
  await dbManager.testSession.endSession();
});
