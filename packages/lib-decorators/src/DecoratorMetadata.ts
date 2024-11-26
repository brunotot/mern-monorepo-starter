import type { DecoratorMetadataInject } from "@/DecoratorMetadataInject";
import type { NoArgsClass } from "@org/lib-commons";

export class DecoratorMetadata {
  #target: DecoratorMetadataInject;
  #metadataRef: DecoratorMetadataObject;

  public constructor(target: DecoratorMetadataInject) {
    // Cannot assign to 'metadata' because it is a read-only property. ts(2540)
    // https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-2.html#decorator-metadata
    // @ts-expect-error TypeScript v5.2 decorators polyfill
    Symbol.metadata ??= Symbol("Symbol.metadata");

    this.#target = target;
    this.#metadataRef = this.getMetadataRef(this.#target);
  }

  public hasKey(key: string) {
    return key in this.#metadataRef;
  }

  public getValue(key: string): unknown {
    return this.#metadataRef[key];
  }

  public setValue(key: string, value: unknown) {
    this.#metadataRef[key] = value;
  }

  private getMetadataRef(target: DecoratorMetadataInject): DecoratorMetadataObject {
    if (this.isClass(target)) {
      // @ts-expect-error TypeScript v5.2 decorators polyfill
      target[Symbol.metadata] ??= {};
      // @ts-expect-error TypeScript v5.2 decorators polyfill
      return target[Symbol.metadata]!;
    }

    // Cannot assign to 'metadata' because it is a read-only property. ts(2540)
    // https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-2.html#decorator-metadata
    // @ts-expect-error TypeScript v5.2 decorators polyfill
    target.metadata ??= {};
    return target.metadata;
  }

  private isClass(target: DecoratorMetadataInject): target is NoArgsClass {
    return typeof target === "function";
  }
}
