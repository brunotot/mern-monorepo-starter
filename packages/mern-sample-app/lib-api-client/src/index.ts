/**
 * @packageDocumentation This shared package supplies backend and app-vite-react with a set of config, models, types, utils and web components.
 */

import { extendZodWithOpenApi } from "@anatine/zod-openapi";
import { z } from "zod";
extendZodWithOpenApi(z);

export * from "./app";
export * from "./lib";
export * from "./errors";
export * from "./schemas";
