import "./config";

import { App, type MongoConnectParamsFactory } from "./App";
import { Environment, ServiceRegistry } from "./config";
import { type MongoClientOptions } from "mongodb";

const mongoConnection: MongoConnectParamsFactory = async () => {
  const options: MongoClientOptions = {};
  const { DB_HOST, DB_PORT } = Environment.getInstance().vars;
  const uri = `mongodb://${DB_HOST}:${DB_PORT}`;
  return { uri, options };
};

ServiceRegistry.getInstance().iocStartup();
const app = new App({ mongoConnection });
export default app;
