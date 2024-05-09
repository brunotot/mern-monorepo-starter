import "@org/backend/config";

import { App } from "./App";
import { ServiceRegistry, MongoClient } from "./config";

// SEED DATABASE WITH MONGODB INMEMORY IMPLEMENTATION OF DEPENDENCY

ServiceRegistry.getInstance().iocStartup();
const app = new App(MongoClient.getInstance());
export default app;
