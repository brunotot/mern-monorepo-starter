import type { DecoratorMetadataInjectType } from "./DecoratorMetadata";

import { DecoratorMetadata } from "./DecoratorMetadata";

export abstract class DecoratorMetadataEntry<Value> {
  #metadata: DecoratorMetadata;
  #key: string;
  #initialState: () => Value;

  protected constructor(target: DecoratorMetadataInjectType, initialState: () => Value) {
    this.#initialState = initialState;
    this.#metadata = new DecoratorMetadata(target);
    this.#key = this.constructor.name;
  }

  public get value(): Value {
    this.populateIfEmpty();
    return this.#metadata.getValue(this.#key) as Value;
  }

  public set value(value: Value) {
    this.populateIfEmpty();
    this.#metadata.setValue(this.#key, value);
  }

  private populateIfEmpty() {
    const metadataExists = this.#metadata.hasKey(this.#key);
    if (metadataExists) return;
    this.#metadata.setValue(this.#key, this.#initialState());
  }
}
