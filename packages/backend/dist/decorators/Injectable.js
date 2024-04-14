import { createClassDecorator } from "@tsvdec/decorators";
import { InjectionMetaService } from "../meta/InjectionMetaService";
const injectionClasses = [];
export function getInjectionClasses() {
    return injectionClasses;
}
export function Injectable(supplier) {
    return createClassDecorator(({ clazz: constructor, meta }) => {
        const context = meta.context;
        const constructorName = constructor.name;
        const targetName = normalizeTargetName(constructorName);
        InjectionMetaService.from(context).setName(targetName);
        injectionClasses.push(constructor);
        supplier === null || supplier === void 0 ? void 0 : supplier(context);
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