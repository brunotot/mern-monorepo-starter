import * as zod from "zod";
import { type TODO } from "../../config";
import { extendZodWithOpenApi } from "@anatine/zod-openapi";
import type { z as zodInternal } from "zod";

type AnatineZodOpenapi = (data: TODO) => TODO;

type AugmentedZod = typeof zod & { openapi: AnatineZodOpenapi };

declare module "zod" {
  interface ZodType {
    openapi: AnatineZodOpenapi;
  }
}

function initZod(): AugmentedZod {
  if ("openapi" in zod && typeof zod.openapi === "function") return zod as AugmentedZod;
  extendZodWithOpenApi(zod);
  return zod as AugmentedZod;
}

export const z: typeof zodInternal & { openapi: AnatineZodOpenapi } = initZod();

export type { zod };
