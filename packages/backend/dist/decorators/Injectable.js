import { createClassDecorator } from "@tsvdec/core";
import { inject } from "../config";
const injectionItems = [];
export function getInjectionItems() {
    return injectionItems;
}
export function getInjectionItem(nameOrClass) {
    const item = injectionItems.find(({ name, class: clazz }) => name === nameOrClass || clazz === nameOrClass);
    if (!item) {
        throw new Error(`No injection item found for ${nameOrClass} of type ${typeof nameOrClass}`);
    }
    return item;
}
export function getInjectionInstance(clazz) {
    const serviceName = getInjectionItem(clazz).name;
    return inject(serviceName);
}
function addInjectionItem(target, name) {
    injectionItems.push({ class: target, name });
}
export function Injectable(metadata) {
    return createClassDecorator((meta, baseClass, context) => {
        var _a, _b;
        var _c;
        const name = normalizeTargetName(baseClass.name);
        addInjectionItem(baseClass, name);
        // @ts-expect-error
        (_a = context.metadata) !== null && _a !== void 0 ? _a : (context.metadata = {});
        (_b = (_c = context.metadata).injectionName) !== null && _b !== void 0 ? _b : (_c.injectionName = name);
        context.metadata.injectionMetadata = metadata !== null && metadata !== void 0 ? metadata : {};
    });
}
function normalizeTargetName(targetName) {
    const commonSuffix = "Impl";
    const targetNameLength = targetName.length;
    const targetNameSanitized = targetName.endsWith(commonSuffix)
        ? targetName.slice(0, targetNameLength - commonSuffix.length)
        : targetName;
    const uncapitalize = (str) => str.charAt(0).toLowerCase() + str.slice(1);
    return uncapitalize(targetNameSanitized);
}
//# sourceMappingURL=Injectable.js.map