import {
  ClassMetadataEntry,
  ClassMetadataInjectType,
} from "@tsvdec/decorators";

export type InjectionMetaItem = {
  name: string;
  dependencies: string[];
};

export class InjectionMetaService extends ClassMetadataEntry<InjectionMetaItem> {
  static from(injection: ClassMetadataInjectType) {
    return new InjectionMetaService(injection);
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
