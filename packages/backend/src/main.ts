import "@org/backend/config";

import { App } from "./App";
import { ServiceRegistry } from "./config";

function main() {
  ServiceRegistry.getInstance().iocStartup();
  const app = new App();
  app.listen();
}

main();
