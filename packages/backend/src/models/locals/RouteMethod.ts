import { z } from "zod";

export const RouteMethod = z.enum(["get", "post", "put", "delete", "patch", "options", "head"]);

export type RouteMethod = z.infer<typeof RouteMethod>;
