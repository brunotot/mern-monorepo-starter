/// <reference types="@types/jest" />

import { exec } from "child_process";
import { mongoConnectionUrlFactory } from "@org/lib-mongodb";

export const TEST_PORT = 8083;
const DUMP_PATH = "./test/config/dump";
const MONGODB_DATABASE_TOOLS_PATH = "./tools/mongodb-database-tools/bin";

let teardown = false;

export default async () => {
  const { server, connectionUrl: mongoUri } = await mongoConnectionUrlFactory();
  const dbDatabase = "test";
  //const startTime = Date.now();
  await restoreMongoDBDump(mongoUri, dbDatabase);
  //const endTime = Date.now();
  // eslint-disable-next-line no-console
  //console.log(`Restored MongoDB dump in ${endTime - startTime}ms`);
  const mongoUrl = mongoUri.replace("mongodb://", "");
  const [host, port] = mongoUrl.split(":");
  process.env.SERVER_DOMAIN = "http://localhost";
  process.env.SERVER_PORT = String(TEST_PORT);
  process.env.SERVER_ENV = "test";
  process.env.SERVER_SESSION_SECRET = "secret-test-key";
  process.env.DATABASE_URL = `mongodb://${host}:${port}`;
  process.env.DATABASE_NAME = dbDatabase;
  process.env.KEYCLOAK_URL = "";
  process.env.KEYCLOAK_ADMIN_CLI_SECRET = "";
  process.env.CORS_ALLOWED_ORIGINS = "";

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
