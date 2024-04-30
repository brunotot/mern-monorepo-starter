import "./index";
import "./config";

import { App } from "./App";
import { Bottle } from "./config";

function main() {
  Bottle.getInstance().iocStartup();
  const app = new App();
  app.listen();
}

main();
