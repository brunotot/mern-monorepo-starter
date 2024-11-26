import type { zod } from "@org/lib-commons";

import { RestErrorResponseBase } from "./RestErrorResponseBase";

export const RestErrorResponse404 = RestErrorResponseBase(404, "Record not found");

export type RestErrorResponse404 = zod.infer<typeof RestErrorResponse404>;
