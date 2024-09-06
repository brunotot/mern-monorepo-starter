/// <reference types="@types/jest" />

import { ErrorLog } from "../src/domain/ErrorLog";

describe("ErrorLog", () => {
  describe("given the ErrorLog entity is properly configured", () => {
    it("should pass", () => {
      const o1 = ErrorLog;
      expect(o1.shape).toHaveProperty("_id");
      expect(o1.shape).toHaveProperty("status");
      expect(o1.shape).toHaveProperty("message");
      expect(o1.shape).toHaveProperty("timestamp");
      expect(o1.description).toEqual("ErrorLog");
    });
  });
});
