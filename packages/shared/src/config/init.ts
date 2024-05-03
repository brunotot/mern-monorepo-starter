import { z } from "zod";
import { extendZodWithOpenApi } from "@anatine/zod-openapi";

extendZodWithOpenApi(z);
