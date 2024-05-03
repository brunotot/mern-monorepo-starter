import { ObjectId } from "./../../utils/TypeUtils";
import z from "zod";

export const ErrorLog = z
  .object({
    _id: z.instanceof(ObjectId).openapi({ example: "507f1f77bcf86cd799439011" }),
    details: z.string().min(0).openapi({
      example: "Request body validation error",
    }),
    status: z.number().openapi({
      example: 400,
    }),
    message: z.string().openapi({
      example: "The server cannot or will not process the request due to an apparent client error.",
    }),
    path: z.string().openapi({
      example: "/auth/login",
    }),
    timestamp: z.string().openapi({
      example: "2024-01-01T00:00:00.000Z",
    }),
    metadata: z.record(z.string(), z.any()).openapi({
      example: {
        errors: [
          "[password] String must contain at least 1 character(s)",
          "[username] String must contain at least 1 character(s)",
        ],
      },
    }),
  })
  .describe("ErrorLog");

export type ErrorLog = z.infer<typeof ErrorLog>;
