import { RoutesMetaService } from "../meta/RoutesMetaService";
import { Injectable } from "./Injectable";
export function Controller(basePath) {
    return Injectable((context) => {
        RoutesMetaService.from(context).setBasePath(basePath);
    });
}
//# sourceMappingURL=Controller.js.map