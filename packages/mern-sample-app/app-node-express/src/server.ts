import { ExpressApp } from "@org/app-node-express/ExpressApp";

import { middleware } from "@org/app-node-express/middleware";
import { scanIocModules } from "@org/app-node-express/modules";
const modules = scanIocModules();

export const server = new ExpressApp({ middleware, modules });
