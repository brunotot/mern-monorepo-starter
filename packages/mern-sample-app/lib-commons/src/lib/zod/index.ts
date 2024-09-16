import { extendZodWithOpenApi } from "@anatine/zod-openapi";
import { z } from "zod";
import { type TODO } from "../../config";

export type AugmentedZod = typeof z & { openapi: (data: TODO) => void };

declare module "zod" {
  interface ZodType {
    openapi: (data: TODO) => TODO;
  }
}

export function zod(): AugmentedZod {
  if ("openapi" in z && typeof z.openapi === "function") return z as AugmentedZod;
  extendZodWithOpenApi(z);
  return z as AugmentedZod;
}

export type { z };
