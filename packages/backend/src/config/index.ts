// Zod: adds openapi() method to Zod objects
import { extendZodWithOpenApi } from "@anatine/zod-openapi";
import { z } from "zod";
extendZodWithOpenApi(z);

// Environment: loads and validates environment variables
import { Environment } from "./singleton/Environment";
Environment.getInstance();

// Swagger: initialize Swagger with default values
import { Swagger } from "./singleton/Swagger";
Swagger.getInstance();

// Bottle: load IOC
import { Bottle } from "./singleton/Bottle";
Bottle.getInstance().iocStartup();
