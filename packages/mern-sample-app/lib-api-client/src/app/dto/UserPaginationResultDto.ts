import { TypedPaginationResult } from "../models";
import { zod, type z as zodTypes } from "@org/lib-commons";
const z = zod();

/** @hidden */
export const UserPaginationResultDto = TypedPaginationResult(
  z.object({
    id: z.string(),
    username: z.string(),
    roles: z.array(z.union([z.literal("admin"), z.literal("user")])),
  }),
);

export type UserPaginationResultDto = zodTypes.infer<typeof UserPaginationResultDto>;
