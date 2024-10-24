import path from "path";

import { env } from "@org/app-node-express/server/env";
import { initServer } from "@org/app-node-express/server/initServer";

async function main() {
  // Initialize Express server
  const server = await initServer({
    outDir: path.join(process.cwd(), "dist"),
    scanDirs: env.SERVER_IOC_SCAN_DIRS,
  });

  // Start listening for connections
  server.startListening();
}

main();
