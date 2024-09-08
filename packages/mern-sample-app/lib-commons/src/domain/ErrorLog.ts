import { Entity } from "../config/Entity.config";
import { z } from "../config/Zod.config";

/** @hidden */
export const ErrorLog = Entity("ErrorLog", {
  status: z.number().openapi({
    example: 400,
  }),
  message: z.string().openapi({
    example: "Request body validation error.",
  }),
  timestamp: z.string().openapi({
    example: "2024-01-01T00:00:00.000Z",
  }),
});

export type ErrorLog = Entity<typeof ErrorLog>;
