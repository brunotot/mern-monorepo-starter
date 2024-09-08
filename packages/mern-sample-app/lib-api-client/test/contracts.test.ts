/// <reference types="@types/jest" />

import { contracts } from "../dist/src";
import { type TODO } from "../../lib-commons";

describe("contracts", () => {
  describe("given the contracts have valid values filled", () => {
    it("should not throw error", async () => {
      const localContracts = contracts;
      const controllers: TODO = Object.values(localContracts);
      const routes: TODO = Object.values(controllers)
        .map((r: TODO) => Object.values(r))
        .flat();
      routes.forEach((route: TODO) => {
        expect(route.strictStatusCodes).toBe(true);
        expect(route.metadata.openApiTags[0]).toBeDefined();
        expect(route.method).toBeDefined();
        expect(route.summary).toBeDefined();
        expect(route.description).toBeDefined();
        expect(Object.keys(route.responses).length > 0).toBe(true);
      });
      //
    });
  });
});
