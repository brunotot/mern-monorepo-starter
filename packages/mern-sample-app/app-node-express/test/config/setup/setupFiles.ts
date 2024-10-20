import { initServer } from "../../../dist/initServer";
import { MongoDatabaseService } from "../../../dist/lib/mongodb/MongoDatabaseService";
import __mocks__ from "../__mocks__";
import { cleanup, setApp } from "./utils";

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
  dbManager.testSession = dbManager.client.startSession();
  dbManager.testSession.startTransaction();
});

afterEach(async () => {
  const dbManager = MongoDatabaseService.getInstance();
  await dbManager.testSession.abortTransaction();
  await dbManager.testSession.endSession();
});
