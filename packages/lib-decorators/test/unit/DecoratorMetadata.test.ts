import type { NoArgsClass } from "@org/lib-commons";

import { DecoratorMetadata } from "@/DecoratorMetadata";

describe("decorator metadata", () => {
  describe("using context injection in decorator", () => {
    it("should read and write successfully at any time", async () => {
      function decorate<This extends NoArgsClass>(
        _target: This,
        context: ClassDecoratorContext<This>,
      ) {
        new DecoratorMetadata(context).setValue("test", "test");
      }

      @decorate
      class TestClass {}

      const decoratorMetadata = new DecoratorMetadata(TestClass);
      expect(decoratorMetadata.hasKey("test")).toBe(true);
      expect(decoratorMetadata.getValue("test")).toBe("test");
    });
  });
  describe("using class injection in decorator", () => {
    it("should not read and write", async () => {
      function decorate<This extends NoArgsClass>(
        target: This,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _context: ClassDecoratorContext<This>,
      ) {
        new DecoratorMetadata(target).setValue("test", "test");
      }

      @decorate
      class TestClass {}

      const decoratorMetadata = new DecoratorMetadata(TestClass);
      expect(decoratorMetadata.hasKey("test")).toBe(false);
    });
  });
});
