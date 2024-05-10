import "./config";

import { App, type MongoConnectParamsFactory } from "./App";
import { Environment, ServiceRegistry } from "./config";
import { MongoClient, type MongoClientOptions } from "mongodb";
import { MongoMemoryServer } from "mongodb-memory-server";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function connectToMemoryDb(): Promise<any> {
  const server = await MongoMemoryServer.create();
  const uri = server.getUri();
  const mongoClient = new MongoClient(uri);
  await mongoClient.connect();
  return mongoClient;
}

const mongoConnection: MongoConnectParamsFactory = async () => {
  const options: MongoClientOptions = {};
  const { DB_HOST, DB_PORT } = Environment.getInstance().vars;
  let uri = `mongodb://${DB_HOST}:${DB_PORT}`;
  if (process.env.NODE_ENV === "test") {
    uri = (await MongoMemoryServer.create()).getUri();
  }
  return { uri, options };
};

ServiceRegistry.getInstance().iocStartup();
const app = new App({ mongoConnection });
export default app;
