import type { TODO } from "@org/shared";
import { createClassDecorator, type ClassDecoratorSupplier } from "@org/backend/decorators";
import { ServiceRegistry, InjectorMetadataManager } from "@org/backend/config";

export function Injectable<This extends new () => TODO>(
  componentName: string,
  supplier?: ClassDecoratorSupplier<This>,
) {
  return createClassDecorator<This>(data => {
    const { clazz: constructor, meta } = data;
    const context = meta.context;
    InjectorMetadataManager.getBy(context).setName(componentName.toLowerCase());
    ServiceRegistry.getInstance().injectionClasses.push(constructor);
    supplier?.(data);
  });
}
