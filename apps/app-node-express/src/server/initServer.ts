/**
 * @packageDocumentation
 *
 * ## Overview
 * This module provides the `initServer` function, which is responsible for initializing the Express application.
 * It loads necessary IoC modules with mocks and initializes the server with configured {@link middleware global middleware}.
 *
 * ## Features
 * - Scans IoC modules from the build directory
 * - Initializes the Express server with middleware and modules
 * - Supports mock services for testing environments
 * - Logs and handles system errors during initialization
 *
 * ## How to Use
 *
 * ### Imports
 *
 * ```ts
 * import { initServer } from "@/initServer";
 * ```
 *
 * ### Basic example of minimal setup
 *
 * ```ts
 * const server = await initServer();
 * // server.startListening();
 * ```
 *
 * ### Mocking IoC components
 *
 * ```ts
 * const server = await initServer({
 *   mocks: {
 *     Authorization: AuthorizationMock,
 *     OtherComponent: OtherComponentMock,
 *     // ...
 *   },
 * });
 * ```
 *
 * ### Specifying custom absolute path to output directory
 *
 * ```ts
 * const server = await initServer({
 *   outDir: "/absolute/path/to/out/dir",
 * });
 * ```
 *
 * ### Specifying custom relative paths from output directory to use for scanning IoC modules
 *
 * ```ts
 * const server = await initServer({
 *   scanDirs: [
 *     "app/infrastructure",
 *     "lib",
 *   ],
 * })
 * ```
 *
 * ### Await in non-async contexts
 *
 * ```ts
 * initServer().then(server => {
 *   // server.startListening();
 * });
 * ```
 */

import type { NoArgsClass } from "@org/lib-commons";
import path from "path";
import { middleware } from "@/app/middleware";
import { scanIocModules } from "@/lib/ioc";
import { log } from "@/lib/winston";
import { env } from "@/server/env";
import { ExpressApp } from "@/server/ExpressApp";

export type InitServerConfig = Partial<{
  mocks: Record<string, NoArgsClass>;
  outDir: string;
  scanDirs: string[];
}>;

export async function initServer(config?: InitServerConfig): Promise<ExpressApp> {
  const {
    mocks = {},
    outDir = path.join(process.cwd(), "dist"),
    scanDirs = env.SERVER_IOC_SCAN_DIRS,
  } = config ?? {};

  let server: ExpressApp;

  try {
    if (ExpressApp.instance) return ExpressApp.instance;

    const modules = await scanIocModules(outDir, scanDirs);
    server = new ExpressApp({ middleware, modules });
    await server.init(mocks);
    // @ts-expect-error Bypassing type check for static property
    ExpressApp.instance = server;
  } catch (error: unknown) {
    if (error instanceof Error) {
      log.error(error.stack);
    } else {
      log.error(JSON.stringify(error));
    }
    process.exit(1);
  }

  return server;
}
