import { createClassDecorator } from "@tsvdec/core";
import { inject } from "../config";
import { Class } from "../utils/types";

export type InjectionItem = {
  name: string;
  class: Class;
};

const injectionItems: InjectionItem[] = [];

export function getInjectionItems() {
  return injectionItems;
}

export function getInjectionItem(nameOrClass: string | Class): InjectionItem {
  const item = injectionItems.find(
    ({ name, class: clazz }) => name === nameOrClass || clazz === nameOrClass
  );

  if (!item) {
    throw new Error(
      `No injection item found for ${nameOrClass} of type ${typeof nameOrClass}`
    );
  }

  return item;
}

export function getInjectionInstance<C extends Class>(
  clazz: C
): InstanceType<C> {
  const serviceName = getInjectionItem(clazz).name;
  return inject<InstanceType<C>>(serviceName);
}

function addInjectionItem(target: Class, name: string) {
  injectionItems.push({ class: target, name });
}

export type InjectableMetadata = Record<string, any>;

export function Injectable<This extends Class>() {
  return createClassDecorator<This>((meta, baseClass, context) => {
    const name = normalizeTargetName(baseClass.name);
    addInjectionItem(baseClass, name);
    // @ts-expect-error
    context.metadata ??= {};
    context.metadata.injectionName ??= name;
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
