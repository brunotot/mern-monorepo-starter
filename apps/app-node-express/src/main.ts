import path from "path";
import { mongoConnectionUrlFactory } from "@org/lib-mongodb";
import { log } from "@/lib/winston";
import { env } from "@/server/env";
import { initServer } from "@/server/initServer";

async function initDatabaseIfNecessary(): Promise<void> {
  if (env.DATABASE_URL) return;
  log.warn("No DATABASE_URL found in environment, initializing in-memory MongoDB database");
  // @ts-expect-error
  env.DATABASE_URL = await mongoConnectionUrlFactory();
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
