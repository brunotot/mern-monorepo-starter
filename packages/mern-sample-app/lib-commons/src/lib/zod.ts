import type { SchemaObject, SecurityRequirementObject } from "openapi3-ts/oas31";

import { extendZodWithOpenApi } from "@anatine/zod-openapi";
import * as zod from "zod";

import { type TODO } from "../app";

declare module "zod" {
  interface ZodSchema<Output = TODO, Def extends zod.ZodTypeDef = zod.ZodTypeDef, Input = Output> {
    openapi<T extends ZodSchema<Output, Def, Input>>(this: T, metadata: Partial<SchemaObject>): T;
  }
}

function initZod() {
  extendZodWithOpenApi(zod);
  return zod;
}

export type { SecurityRequirementObject };

export const z = initZod();

export type { zod };
