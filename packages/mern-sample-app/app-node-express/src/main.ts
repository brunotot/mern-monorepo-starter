import path from "path";

import { log } from "@org/app-node-express/lib/winston";
import { env } from "@org/app-node-express/server/env";
import { initServer } from "@org/app-node-express/server/initServer";
import { MongoMemoryReplSet } from "mongodb-memory-server";

async function initDatabaseIfNecessary(): Promise<void> {
  if (env.DATABASE_URL) return;
  log.warn("No DATABASE_URL found in environment, initializing in-memory MongoDB database");
  const REPLICA_SET_COUNT = 3;
  const server = await MongoMemoryReplSet.create({ replSet: { count: REPLICA_SET_COUNT } });
  const mongoUri = server.getUri();
  const mongoUrl = mongoUri.replace("mongodb://", "");
  const [host, port] = mongoUrl.split(":");
  // @ts-expect-error
  env.DATABASE_URL = `mongodb://${host}:${port}`;
}

async function main() {
  await initDatabaseIfNecessary();

  // Initialize Express server
  const server = await initServer({
    outDir: path.join(process.cwd(), "dist"),
    scanDirs: env.SERVER_IOC_SCAN_DIRS,
  });

  // Start listening for connections
  server.startListening();
}

main();
