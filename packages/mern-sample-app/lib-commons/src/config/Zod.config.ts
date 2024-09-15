import { extendZodWithOpenApi } from "@anatine/zod-openapi";
import { z } from "zod";

// TODO Import this file in all modules and only use this "z" import

extendZodWithOpenApi(z);

export { z };
