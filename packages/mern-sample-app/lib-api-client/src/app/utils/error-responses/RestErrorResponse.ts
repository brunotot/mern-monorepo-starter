import { z, type zod } from "@org/lib-commons";

export const RestErrorResponse = z.object({
  status: z.number(),
  message: z.string(),
  timestamp: z.string().openapi({ example: "2024-01-01T00:00:00.000Z" }),
});

export type RestErrorResponse = zod.infer<typeof RestErrorResponse>;
