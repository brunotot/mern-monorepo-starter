import type { zod } from "@org/lib-commons";

import { RestErrorResponseBase } from "./RestErrorResponseBase";

export const RestErrorResponse500 = RestErrorResponseBase(500, "Unexpected server error");

export type RestErrorResponse500 = zod.infer<typeof RestErrorResponse500>;
