/// <reference types="@types/jest" />

import { z } from "zod";
import { JsonQueryParam } from "../src/app/models/utils/JsonQueryParam";

describe("JsonQueryParam", () => {
  const queryParamInstance = JsonQueryParam(
    z.object({
      foo: z.string(),
    }),
  );

  describe("given a valid JSON is provided", () => {
    it("should parse string to the given schema", () => {
      const o1Res = queryParamInstance.safeParse(`{"foo":"test"}`);
      expect(o1Res.success).toBe(true);
    });
  });

  describe("given a malformed JSON is provided", () => {
    it("should not parse string to the given schema", () => {
      expect(() => queryParamInstance.safeParse(`{"foo-invalid":"test"}`)).toThrow();
    });
  });
});
