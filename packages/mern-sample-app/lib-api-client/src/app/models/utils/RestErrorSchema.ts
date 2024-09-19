import { type zod } from "@org/lib-commons";

import { RestError500Schema } from "./RestError500Schema";

export const RestErrorSchema = RestError500Schema.extend({}).describe("").openapi({
  title: undefined,
  description: undefined,
});

export type RestErrorSchema = zod.infer<typeof RestErrorSchema>;
