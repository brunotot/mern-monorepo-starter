import { DecoratorMetadata, type DecoratorMetadataInjectType } from "./DecoratorMetadata";

export abstract class DecoratorMetadataEntry<Value> {
  #metadata: DecoratorMetadata;
  #key: string;
  #initialState: () => Value;

  protected constructor(target: DecoratorMetadataInjectType, initialState: () => Value) {
    this.#initialState = initialState;
    this.#metadata = DecoratorMetadata.for(target);
    this.#key = this.constructor.name;
  }

  public get value(): Value {
    if (!this.#metadata.hasKey(this.#key)) this.#metadata.setValue(this.#key, this.#initialState());
    return this.#metadata.getValue(this.#key);
  }
}
