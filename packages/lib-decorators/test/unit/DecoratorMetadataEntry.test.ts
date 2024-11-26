import type { DecoratorMetadataInject } from "@/DecoratorMetadataInject";
import type { NoArgsClass } from "@org/lib-commons";

import { DecoratorMetadataEntry } from "@/DecoratorMetadataEntry";

describe("decorator metadata entry", () => {
  describe("using context injection in decorator", () => {
    it("should read and write successfully at any time", async () => {
      class Test extends DecoratorMetadataEntry<{ key: string }> {
        public static getInstance(injection: DecoratorMetadataInject) {
          return new Test(injection);
        }

        private constructor(target: DecoratorMetadataInject) {
          super(target, () => ({ key: "" }));
        }
      }

      function decorate(value: string) {
        return function <This extends NoArgsClass>(
          _target: This,
          context: ClassDecoratorContext<This>,
        ) {
          Test.getInstance(context).value = { key: value };
        };
      }

      @decorate("test")
      class TestClass {}

      const value = Test.getInstance(TestClass).value;
      expect(value).toBeDefined();
      expect(value).toHaveProperty("key");
      expect(value.key).toBe("test");
    });
  });
  describe("using class injection in decorator", () => {
    it("should not read and write", async () => {
      class Test extends DecoratorMetadataEntry<{ key: string }> {
        public static getInstance(injection: DecoratorMetadataInject) {
          return new Test(injection);
        }

        private constructor(target: DecoratorMetadataInject) {
          super(target, () => ({ key: "" }));
        }
      }

      function decorate(value: string) {
        return function <This extends NoArgsClass>(
          target: This,
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          _context: ClassDecoratorContext<This>,
        ) {
          Test.getInstance(target).value = { key: value };
        };
      }

      @decorate("test")
      class TestClass {}

      const value = Test.getInstance(TestClass).value;
      expect(value).toBeDefined();
      expect(value).toHaveProperty("key");
      expect(value.key).toBe("");
    });
  });
});
