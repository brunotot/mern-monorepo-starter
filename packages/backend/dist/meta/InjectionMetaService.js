import { ClassMetadataEntry, } from "@tsvdec/decorators";
export class InjectionMetaService extends ClassMetadataEntry {
    static from(injection) {
        return new InjectionMetaService(injection);
    }
    constructor(injection) {
        super(injection, () => ({
            name: "",
            dependencies: [],
        }));
    }
    setName(name) {
        this.value.name = name;
    }
    addDependency(name) {
        this.value.dependencies.push(name);
    }
}
//# sourceMappingURL=InjectionMetaService.js.map