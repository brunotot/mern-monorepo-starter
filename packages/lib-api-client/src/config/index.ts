import { extendZodWithOpenApi } from "@anatine/zod-openapi";
import { z } from "@org/lib-commons";

extendZodWithOpenApi(z);

export * from "./Contract.config";
