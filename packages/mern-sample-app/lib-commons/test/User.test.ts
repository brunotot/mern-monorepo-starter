/// <reference types="@types/jest" />

import { User } from "../src/domain/User";

describe("User", () => {
  describe("given the User entity is properly configured", () => {
    it("should pass", () => {
      const o1 = User;
      expect(o1.shape).toHaveProperty("_id");
      expect(o1.shape).toHaveProperty("username");
      expect(o1.shape).toHaveProperty("password");
      expect(o1.shape).toHaveProperty("email");
      expect(o1.shape).toHaveProperty("email");
      expect(o1.shape).toHaveProperty("refreshToken");
      expect(o1.description).toEqual("User");
    });
  });
});
