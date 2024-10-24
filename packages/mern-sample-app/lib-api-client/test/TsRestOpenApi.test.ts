/// <reference types="@types/jest" />

import { buildOpenAPIObject } from "../src/lib/@ts-rest/TsRestOpenApi";

describe("contracts", () => {
  describe("given the contracts have valid values filled", () => {
    it("should not throw error", async () => {
      buildOpenAPIObject({
        authorizationUrl: "authorizationUrl",
        tokenUrl: "tokenUrl",
        version: "version",
      });
    });
  });
});
