/// <reference types="@types/jest" />

import { z } from "../src/lib";

describe("zod", () => {
  describe("given zod configuration is valid", () => {
    it("should not throw error", async () => {
      expect(z.object({})).toHaveProperty("openapi");
    });
  });
});
