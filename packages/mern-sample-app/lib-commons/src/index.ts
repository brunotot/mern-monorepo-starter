/**
 * @packageDocumentation This shared package supplies backend and app-vite-react with a set of config, models, types, utils and web components.
 */

import z from "zod";
import { extendZodWithOpenApi } from "@anatine/zod-openapi";
extendZodWithOpenApi(z);

export * from "./config";
export * from "./schemas";