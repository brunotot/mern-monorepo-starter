import { type TODO, type Class } from "@org/shared";
import type { ClassMetadataEntry } from "./ClassMetadataEntry.config";

export type ClassMetadataEntryInstance<T extends ClassMetadataEntryConstructor> =
  T extends ClassMetadataEntryConstructor<infer U> ? U : never;

export type ClassMetadataEntryConstructor<T = TODO> = Class<ClassMetadataEntry<T>>;

export const METADATA_KEY: unique symbol = Symbol("Symbol.metadata");

// @ts-expect-error Stage 3 decorators polyfill.
Symbol.metadata ??= Symbol("Symbol.metadata");

declare global {
  interface Function {
    // @ts-expect-error Stage 3 decorators polyfill.
    [Symbol.metadata]: DecoratorMetadataObject;
  }
}

export type ClassMetadataInjectType = Class | DecoratorContext;

export class ClassMetadata {
  public static for(target: ClassMetadataInjectType) {
    return new ClassMetadata(target);
  }

  #target: ClassMetadataInjectType;
  #metadataRef: DecoratorMetadataObject;

  private constructor(target: ClassMetadataInjectType) {
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

  #getMetadataRef(target: ClassMetadataInjectType): DecoratorMetadataObject {
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
