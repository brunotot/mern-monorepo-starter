import { type Class } from "@org/lib-commons";

import { log } from "@org/app-node-express/logger";
import { MongoDatabaseService } from "./lib/mongodb";
import { ExpressApp } from "@org/app-node-express/ExpressApp";
import { middleware } from "@org/app-node-express/middleware";
import { scanIocModules } from "@org/app-node-express/modules";

/**
 * Paths to directories to scan for classes with **\@inject** decorator.
 *
 * @remark Paths are relative to `app-node-express/src`
 * @example
 * ["infrastructure", "lib"]
 */
const IOC_SCANNED_DIRS = ["infrastructure"];

export async function startup(
  mocks: Record<string, Class> = {},
  onReady?: (app: ExpressApp) => void,
  listen: boolean = true,
) {
  try {
    const modules = await scanIocModules(IOC_SCANNED_DIRS);
    const server = new ExpressApp({ middleware, modules });
    await server.init(mocks, onReady);
    const databaseService = MongoDatabaseService.getInstance();
    databaseService.client = server.mongoClient;
    if (listen) {
      await server.startListening();
    }
  } catch (error: unknown) {
    // eslint-disable-next-line no-console
    console.log(error);
    if (typeof error === "object" && error !== null && "message" in error) {
      log.error((error as { message: string }).message);
    } else {
      log.error(error);
    } //
    process.exit(1);
  }
}
