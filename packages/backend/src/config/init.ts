import { extendZodWithOpenApi } from "@anatine/zod-openapi";
import { z } from "zod";

import { Environment } from "./singleton/Environment";
import { Swagger } from "./singleton/Swagger";

extendZodWithOpenApi(z);
Environment.getInstance();
Swagger.getInstance();
