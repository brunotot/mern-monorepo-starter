import { extendZodWithOpenApi } from "@anatine/zod-openapi";
import { z } from "zod";
extendZodWithOpenApi(z);

import { log } from "@org/app-node-express/logger";
import { server } from "@org/app-node-express/server";

(async () => {
  try {
    await server.init();
    await server.startListening();
  } catch (error: unknown) {
    console.log(error);
    if (typeof error === "object" && error !== null && "message" in error) {
      log.error((error as { message: string }).message);
    } else {
      log.error(error);
    } //
    process.exit(1);
  }
})();
