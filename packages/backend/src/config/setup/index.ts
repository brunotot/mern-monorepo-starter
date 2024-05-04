import z from "zod";
import { extendZodWithOpenApi } from "@anatine/zod-openapi";
import { Environment } from "@org/backend/config/singletons/Environment";

extendZodWithOpenApi(z);
Environment.getInstance();

process.on("uncaughtException", err => {
  console.error("There was an uncaught error", err);
  process.exit(1);
});
    
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});