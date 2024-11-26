import type { zod } from "@org/lib-commons";

import { RestErrorResponseBase } from "./RestErrorResponseBase";

export const RestErrorResponse401 = RestErrorResponseBase(401, "Unauthorized");

export type RestErrorResponse401 = zod.infer<typeof RestErrorResponse401>;
