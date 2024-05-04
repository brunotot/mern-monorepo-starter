import type { TODO } from "@org/shared";
import { createClassDecorator, type ClassDecoratorSupplier } from "@tsvdec/decorators";
import { ServiceRegistry, InjectorMetadataManager } from "@org/backend/config";

export function Injectable<This extends new () => TODO>(supplier?: ClassDecoratorSupplier<This>) {
  return createClassDecorator<This>(data => {
    const { clazz: constructor, meta } = data;
    const context = meta.context;
    const constructorName: string = constructor.name;
    const targetName = normalizeTargetName(constructorName);
    InjectorMetadataManager.getBy(context).setName(targetName);
    ServiceRegistry.getInstance().injectionClasses.push(constructor);
    supplier?.(data);
  });
}

function normalizeTargetName(targetName: string) {
  const commonSuffix = "Impl";
  const targetNameLength = targetName.length;
  const targetNameSanitized = targetName.endsWith(commonSuffix)
    ? targetName.slice(0, targetNameLength - commonSuffix.length)
    : targetName;
  const uncapitalize = (str: string) => str.charAt(0).toLowerCase() + str.slice(1);
  return uncapitalize(targetNameSanitized);
}
