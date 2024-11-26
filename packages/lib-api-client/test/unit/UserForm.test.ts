import { UserForm } from "@/app/models/form/UserForm";

describe("contracts", () => {
  describe("given the contracts have valid values filled", () => {
    it("should parse UserForm", async () => {
      const result = UserForm.safeParse({
        username: "test",
        enabled: true,
        roles: ["avr-user"],
        password: "1234",
      });

      expect(result.success).toBe(true);
    });

    it("should not parse UserForm", async () => {
      const result = UserForm.safeParse({
        username: "test",
        enabled: true,
        roles: [],
        password: "",
      });

      expect(result.success).toBe(false);
    });
  });
});
