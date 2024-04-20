import { extendZodWithOpenApi } from "@anatine/zod-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

/** @hidden */
export { z };
