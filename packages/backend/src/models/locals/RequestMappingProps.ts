import { z } from "zod";
import { RouteMethod } from "@models/locals/RouteMethod";
import { type RouteMiddleware } from "@models/locals/RouteMiddleware";

export const RequestMappingProps = z.object({
  name: z.string().min(1),
  method: RouteMethod,
  path: z.string().min(1),
  middlewares: z.custom<RouteMiddleware[]>().default([]),
});

export type RequestMappingProps = z.infer<typeof RequestMappingProps>;
