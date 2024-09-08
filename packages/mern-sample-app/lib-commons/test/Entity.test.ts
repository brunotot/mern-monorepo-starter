/// <reference types="@types/jest" />

import { z } from "zod";
import { Entity } from "../src/config/Entity.config";

describe("Entity", () => {
  describe("given the entity name is present", () => {
    it("should return a valid entity", () => {
      const o1Name = "o1 test";
      const o1CustomKey1 = "foo";
      const o1 = Entity(o1Name, { [o1CustomKey1]: z.string() });

      expect(o1.shape).toHaveProperty("_id");
      expect(o1.shape).toHaveProperty(o1CustomKey1);
      expect(o1.description).toEqual(o1Name);
    });
  });
  describe("given the entity name is not present ", () => {
    it("should throw error", () => {
      const o1Name = "";
      expect(() => Entity(o1Name, {})).toThrow();
    });
  });
});
