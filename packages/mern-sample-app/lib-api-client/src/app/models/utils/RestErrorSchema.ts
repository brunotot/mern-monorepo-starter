import { RestError500Schema } from "./RestError500Schema";
import { type zod } from "@org/lib-commons";

export const RestErrorSchema = RestError500Schema.extend({}).describe("").openapi({
  title: undefined,
  description: undefined,
});

export type RestErrorSchema = zod.infer<typeof RestErrorSchema>;
