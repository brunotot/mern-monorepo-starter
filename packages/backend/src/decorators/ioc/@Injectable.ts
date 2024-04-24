import type { Class, TODO } from "@org/shared";
import { createClassDecorator } from "@tsvdec/decorators";

import { Bottle, InjectionDecoratorManager } from "@config";

export type ClassDecoratorSupplier = (context: DecoratorContext, constructor: Class) => void;

export function Injectable<This extends new () => TODO>(supplier?: ClassDecoratorSupplier) {
  return createClassDecorator<This>(({ clazz: constructor, meta }) => {
    const context = meta.context;
    const constructorName: string = constructor.name;
    const targetName = normalizeTargetName(constructorName);
    InjectionDecoratorManager.from(context).setName(targetName);
    Bottle.getInstance().injectionClasses.push(constructor);
    supplier?.(context, constructor);
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
