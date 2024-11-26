import { zodAny } from "@/app/CommonUtils";

describe("zod", () => {
  describe("given zod configuration is valid", () => {
    it("instantiated zod object should have openapi property defined", async () => {
      expect(zodAny()).toHaveProperty("openapi");
    });
  });
});
