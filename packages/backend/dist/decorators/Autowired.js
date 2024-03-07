import { createFieldDecorator } from "@tsvdec/core";
import { getInjectionInstance, getInjectionItem } from "./Injectable";
export function getMetadata(clazz) {
    var _a, _b;
    // @ts-expect-error
    (_a = Symbol.metadata) !== null && _a !== void 0 ? _a : (Symbol.metadata = Symbol("Symbol.metadata"));
    // @ts-expect-error
    return (_b = clazz[Symbol.metadata]) !== null && _b !== void 0 ? _b : {};
}
/**
 * @remarks ONLY WORKS WITH CURRENT HOTFIX OF @tsvdec/core
 * The `createFieldDecorator` doesn't natively return the result of the supplier so the hotfix fixed that.
 */
export function Autowired() {
    return createFieldDecorator((meta, name, context, args) => {
        var _a, _b;
        var _c;
        console.log(meta.value);
        // @ts-expect-error
        (_a = context.metadata) !== null && _a !== void 0 ? _a : (context.metadata = {});
        (_b = (_c = context.metadata).dependencies) !== null && _b !== void 0 ? _b : (_c.dependencies = []);
        // @ts-expect-error
        context.metadata.dependencies.push(String(context.name));
        return function (_args) {
            return getInjectionInstance(getInjectionItem(String(context.name)).class);
        };
    });
}
//# sourceMappingURL=Autowired.js.map