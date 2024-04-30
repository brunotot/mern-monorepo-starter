import type { RequestRoute, RoutesMetaItem } from "@models";
import { type ClassMetadataInjectType, ClassMetadataEntry } from "@tsvdec/decorators";

export class RouteDecoratorManager extends ClassMetadataEntry<RoutesMetaItem> {
  static from(injection: ClassMetadataInjectType) {
    return new RouteDecoratorManager(injection);
  }

  constructor(injection: ClassMetadataInjectType) {
    super(injection, () => ({
      basePath: "",
      routes: [],
    }));
  }

  updateRoute(routeName: string, newState: (route: RequestRoute) => RequestRoute) {
    const index = this.value.routes.findIndex(r => r.name === routeName);
    if (index === -1) return;
    this.value.routes[index] = newState(this.value.routes[index]);
  }

  setBasePath(basePath: string) {
    this.value.basePath = basePath;
  }

  addRoute(route: RequestRoute) {
    this.value.routes.push(route);
  }
}
