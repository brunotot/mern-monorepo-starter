import { TypedPaginationResult } from "../models";
import { z, type zod } from "@org/lib-commons";

/** @hidden */
export const UserPaginationResultDto = TypedPaginationResult(
  z.object({
    id: z.string(),
    username: z.string(),
    roles: z.array(z.union([z.literal("admin"), z.literal("user")])),
  }),
);

export type UserPaginationResultDto = zod.infer<typeof UserPaginationResultDto>;
