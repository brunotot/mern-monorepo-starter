// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { MongoMemoryReplSet, MongoMemoryServer } from "mongodb-memory-server";
import { exec } from "child_process";

const TEST_PORT = 8082;
const REPLICA_SET_COUNT = 3;
const DUMP_PATH = "./test/dump";
const MONGODB_DATABASE_TOOLS_PATH = "./tools/mongodb-database-tools/bin";

let teardown = false;

export default async () => {
  const server = await MongoMemoryReplSet.create({ replSet: { count: REPLICA_SET_COUNT } });

  //const server = await MongoMemoryServer.create();
  const mongoUri = server.getUri();
  const dbDatabase = "test";
  const startTime = Date.now();
  await restoreMongoDBDump(mongoUri, dbDatabase);
  const endTime = Date.now();
  console.log(`Restored MongoDB dump in ${endTime - startTime}ms`);
  const mongoUrl = mongoUri.replace("mongodb://", "");
  const [host, port] = mongoUrl.split(":");
  process.env.PORT = String(TEST_PORT);
  process.env.MONGO_URL = `mongodb://${host}:${port}`;
  process.env.MONGO_DATABASE = dbDatabase;
  return async () => {
    if (teardown) throw new Error("teardown called twice");
    teardown = true;
    await server.stop({ doCleanup: true, force: true });
  };
};

function restoreMongoDBDump(uri: string, databaseName: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const command = `${MONGODB_DATABASE_TOOLS_PATH}/mongorestore --uri ${uri} --db ${databaseName} ${DUMP_PATH} --drop`;
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(`Error: ${error.message}`);
        return;
      }
      if (stderr) {
        //console.error(`Stderr: ${stderr}`);
      }
      //console.log(`MongoDB restored successfully: ${stdout}`);
      resolve();
    });
  });
}
