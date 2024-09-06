import { RestError500 } from "./RestError500";

export const RestError = RestError500.extend({}).describe("").openapi({
  title: undefined,
  description: undefined,
});
