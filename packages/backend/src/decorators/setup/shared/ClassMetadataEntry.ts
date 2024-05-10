import { type Class, type TODO } from "@org/shared";
import { ClassMetadata, type ClassMetadataInjectType } from "./ClassMetadata";

export type ClassMetadataEntryInstance<T extends ClassMetadataEntryConstructor> =
  T extends ClassMetadataEntryConstructor<infer U> ? U : never;

export type ClassMetadataEntryConstructor<T = TODO> = Class<ClassMetadataEntry<T>>;

export abstract class ClassMetadataEntry<Value> {
  #metadata: ClassMetadata;
  #key: string;
  #initialState: () => Value;

  protected constructor(target: ClassMetadataInjectType, initialState: () => Value) {
    this.#initialState = initialState;
    this.#metadata = ClassMetadata.for(target);
    this.#key = this.constructor.name;
  }

  public get value(): Value {
    if (!this.#metadata.hasKey(this.#key)) this.#metadata.setValue(this.#key, this.#initialState());
    return this.#metadata.getValue(this.#key);
  }
}
