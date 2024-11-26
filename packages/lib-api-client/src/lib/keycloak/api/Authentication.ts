import { z, type zod } from "@org/lib-commons";

export const Authentication = z.object({
  access_token: z.string(),
  expires_in: z.number(),
});

export type Authentication = zod.infer<typeof Authentication>;
