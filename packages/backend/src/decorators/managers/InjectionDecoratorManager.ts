import { ClassMetadataEntry, ClassMetadataInjectType } from "@tsvdec/decorators";

export type InjectionMetaItem = {
  name: string;
  dependencies: string[];
};

export class InjectionDecoratorManager extends ClassMetadataEntry<InjectionMetaItem> {
  static from(injection: ClassMetadataInjectType) {
    return new InjectionDecoratorManager(injection);
  }

  private constructor(injection: ClassMetadataInjectType) {
    super(injection, () => ({
      name: "",
      dependencies: [],
    }));
  }

  setName(name: string) {
    this.value.name = name;
  }

  addDependency(name: string) {
    this.value.dependencies.push(name);
  }
}
