import path from "path";

import { env } from "@org/app-node-express/env";
import { ExpressApp } from "@org/app-node-express/ExpressApp";
import { scanIocModules } from "@org/app-node-express/lib/bottlejs";
import { log } from "@org/app-node-express/logger";
import { middleware } from "@org/app-node-express/middleware";
import { type NoArgsClass } from "@org/lib-commons";

import { MongoDatabaseService } from "./lib/mongodb";

export async function startup(
  mocks: Record<string, NoArgsClass> = {},
  onReady?: (app: ExpressApp) => void,
  listen: boolean = true,
) {
  try {
    const PATH_TO_BUILD_DIR = path.join(process.cwd(), "dist");
    const modules = await scanIocModules(PATH_TO_BUILD_DIR, env.SERVER_IOC_SCAN_DIRS);
    const server = new ExpressApp({ middleware, modules });
    await server.init(mocks, onReady);
    const databaseService = MongoDatabaseService.getInstance();
    databaseService.client = server.mongoClient;
    if (listen) {
      await server.startListening();
    }
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "message" in error) {
      log.error((error as { message: string }).message);
    } else {
      log.error(error);
    }
    process.exit(1);
  }
}
