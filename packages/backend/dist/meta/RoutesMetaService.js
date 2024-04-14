import { ClassMetadataEntry, } from "@tsvdec/decorators";
export class RoutesMetaService extends ClassMetadataEntry {
    static from(injection) {
        return new RoutesMetaService(injection);
    }
    constructor(injection) {
        super(injection, () => ({
            basePath: "",
            routes: [],
        }));
    }
    getRoute(routeName) {
        return this.value.routes.find((r) => r.name === routeName);
    }
    updateRoute(routeName, newState) {
        const index = this.value.routes.findIndex((r) => r.name === routeName);
        if (index === -1)
            return;
        this.value.routes[index] = newState(this.value.routes[index]);
    }
    setBasePath(basePath) {
        this.value.basePath = basePath;
    }
    addRoute(route) {
        this.value.routes.push(route);
    }
}
//# sourceMappingURL=RoutesMetaService.js.map