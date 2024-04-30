import { extendZodWithOpenApi } from "@anatine/zod-openapi";
import z from "zod";

import { Environment } from "@config/singleton/Environment";
import { Swagger } from "@config/singleton/Swagger";

extendZodWithOpenApi(z);
Environment.getInstance();
Swagger.getInstance();
