import { MongoMemoryServer } from "mongodb-memory-server";
import { exec } from "child_process";
import console from "console";

const DUMP_PATH = "./test/dump";
const MONGODB_DATABASE_TOOLS_PATH = "./tools/mongodb-database-tools/bin";

function restoreMongoDBDump(uri: string, databaseName: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const command = `${MONGODB_DATABASE_TOOLS_PATH}/mongorestore --uri ${uri} --db ${databaseName} ${DUMP_PATH}`;
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(`Error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`Stderr: ${stderr}`);
      }
      //console.log(`MongoDB restored successfully: ${stdout}`);
      resolve();
    });
  });
}

let teardown = false;

export default async () => {
  const server = await MongoMemoryServer.create();
  const mongoUri = server.getUri();
  const dbDatabase = "test";
  await restoreMongoDBDump(mongoUri, dbDatabase);
  const mongoUrl = mongoUri.replace("mongodb://", "");
  const [host, port] = mongoUrl.split(":");
  process.env.MONGO_URL = `mongodb://${host}:${port}`;
  process.env.MONGO_DATABASE = dbDatabase;
  process.env.ACCESS_TOKEN_SECRET = "testAccessTokenSecret";
  process.env.REFRESH_TOKEN_SECRET = "testRefreshTokenSecret";
  return async () => {
    if (teardown) throw new Error("teardown called twice");
    teardown = true;
    await server.stop({ doCleanup: true, force: true });
  };
};
