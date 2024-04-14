import { createMethodDecorator } from "@tsvdec/decorators";
import { RoutesMetaService, } from "../meta/RoutesMetaService";
export function Use(...handlers) {
    return createMethodDecorator(({ meta }) => {
        const routeName = String(meta.context.name);
        const routeService = RoutesMetaService.from(meta.context);
        routeService.updateRoute(routeName, (r) => {
            var _a;
            return (Object.assign(Object.assign({}, r), { middlewares: [...((_a = r.middlewares) !== null && _a !== void 0 ? _a : []), ...handlers] }));
        });
    });
}
//# sourceMappingURL=Use.js.map