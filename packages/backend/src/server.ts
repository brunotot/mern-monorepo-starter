import "./config";

import { App, type MongoConnectParamsFactory } from "./App";
import { Environment, ServiceRegistry } from "./config";
import { type MongoClientOptions } from "mongodb";

const mongoConnection: MongoConnectParamsFactory = async () => {
  const options: MongoClientOptions = {};
  const { MONGO_URL } = Environment.getInstance().vars;
  const uri = MONGO_URL;
  return { uri, options };
};

ServiceRegistry.getInstance().iocStartup();
const app = new App({ mongoConnection });
export default app;
