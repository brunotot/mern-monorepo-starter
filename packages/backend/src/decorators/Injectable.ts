import { Class } from "@org/shared";
import { createClassDecorator } from "@tsvdec/decorators";
import { InjectionMetaService } from "../meta/InjectionMetaService";

const injectionClasses: Class[] = [];

export function getInjectionClasses() {
  return injectionClasses;
}

export type ClassDecoratorSupplier = (context: DecoratorContext) => void;

export function Injectable<This extends Class>(
  supplier?: ClassDecoratorSupplier
) {
  return createClassDecorator<This>(({ clazz: constructor, meta }) => {
    const context = meta.context;
    const constructorName: string = constructor.name;
    const targetName = normalizeTargetName(constructorName);
    InjectionMetaService.from(context).setName(targetName);
    injectionClasses.push(constructor);
    supplier?.(context);
  });
}

function normalizeTargetName(targetName: string) {
  const commonSuffix = "Impl";
  const targetNameLength = targetName.length;
  const targetNameSanitized = targetName.endsWith(commonSuffix)
    ? targetName.slice(0, targetNameLength - commonSuffix.length)
    : targetName;
  const uncapitalize = (str: string) =>
    str.charAt(0).toLowerCase() + str.slice(1);
  return uncapitalize(targetNameSanitized);
}
