import { extendZodWithOpenApi } from "@anatine/zod-openapi";
import z from "zod";

import { Environment } from "@org/backend/config/singleton/Environment";

extendZodWithOpenApi(z);
Environment.getInstance();
