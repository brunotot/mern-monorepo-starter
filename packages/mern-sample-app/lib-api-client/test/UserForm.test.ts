/// <reference types="@types/jest" />

import { UserForm } from "../src/app/models/form/UserForm";

describe("contracts", () => {
  describe("given the contracts have valid values filled", () => {
    it("should parse UserForm", async () => {
      const result = UserForm.safeParse({
        username: "test",
        enabled: true,
        roles: [],
        hasCredentials: true,
        password: "test",
      });

      expect(result.success).toBe(true);
    });

    it("should not parse UserForm", async () => {
      const result = UserForm.safeParse({
        username: "test",
        enabled: true,
        roles: [],
        hasCredentials: false,
        password: "",
      });

      expect(result.success).toBe(true);
    });

    it("should not parse UserForm", async () => {
      const result = UserForm.safeParse({
        username: "test",
        enabled: true,
        roles: [],
        hasCredentials: true,
        password: undefined,
      });

      expect(result.success).toBe(false);
    });

    it("should not parse UserForm", async () => {
      const result = UserForm.safeParse({
        username: "test",
        enabled: true,
        roles: [],
        hasCredentials: true,
        password: "",
      });

      expect(result.success).toBe(false);
    });
  });
});
