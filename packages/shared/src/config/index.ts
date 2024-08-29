import z from "zod";
import { extendZodWithOpenApi } from "@anatine/zod-openapi";
extendZodWithOpenApi(z);

export * from "./Contract.config";
export * from "./Entity.config";
export * from "./ResponseError.config";
export * from "./Types.config";
