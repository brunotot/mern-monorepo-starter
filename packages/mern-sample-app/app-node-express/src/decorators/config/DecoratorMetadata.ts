import { type TODO, type Class } from "@org/lib-commons";
import type { DecoratorMetadataEntry } from "./DecoratorMetadataEntry";

export type DecoratorMetadataEntryInstance<T extends DecoratorMetadataEntryConstructor> =
  T extends DecoratorMetadataEntryConstructor<infer U> ? U : never;

export type DecoratorMetadataEntryConstructor<T = TODO> = Class<DecoratorMetadataEntry<T>>;

export const METADATA_KEY: unique symbol = Symbol("Symbol.metadata");

// @ts-expect-error Stage 3 decorators polyfill.
Symbol.metadata ??= Symbol("Symbol.metadata");

declare global {
  interface Function {
    // @ts-expect-error Stage 3 decorators polyfill.
    [Symbol.metadata]: DecoratorMetadataObject;
  }
}

export type DecoratorMetadataInjectType = Class | DecoratorContext;

export class DecoratorMetadata {
  public static for(target: DecoratorMetadataInjectType) {
    return new DecoratorMetadata(target);
  }

  #target: DecoratorMetadataInjectType;
  #metadataRef: DecoratorMetadataObject;

  private constructor(target: DecoratorMetadataInjectType) {
    this.#target = target;
    this.#metadataRef = this.#getMetadataRef(this.#target);
  }

  public hasKey(key: string) {
    return key in this.#metadataRef;
  }

  public getValue<T = TODO>(key: string): T {
    return this.#metadataRef[key] as T;
  }

  public setValue<T = TODO>(key: string, value: T) {
    this.#metadataRef[key] = value;
  }

  #getMetadataRef(target: DecoratorMetadataInjectType): DecoratorMetadataObject {
    if (typeof target === "function") {
      // @ts-expect-error Stage 3 decorators polyfill.
      target[Symbol.metadata] ??= {};
      // @ts-expect-error Stage 3 decorators polyfill.
      return target[Symbol.metadata]!;
    }
    // @ts-expect-error Stage 3 decorators polyfill.
    target.metadata ??= {};
    return target.metadata;
  }
}
