import type { zod } from "@org/lib-commons";

import { RestErrorResponseBase } from "./RestErrorResponseBase";

export const RestErrorResponse403 = RestErrorResponseBase(403, "Forbidden");

export type RestErrorResponse403 = zod.infer<typeof RestErrorResponse403>;
