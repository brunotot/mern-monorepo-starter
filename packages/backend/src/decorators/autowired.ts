import { type TODO } from "@org/shared";
import { InjectorMetadataManager } from "@org/backend/config/InjectorMetadataManager.config";
import { iocRegistry } from "@org/backend/setup/registry.setup";

export function autowired(_target: undefined, context: ClassFieldDecoratorContext<TODO, TODO>) {
  const componentName = String(context.name).toLowerCase();
  InjectorMetadataManager.getBy(context).addDependency(componentName);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return function (_value: TODO) {
    return iocRegistry.inject<TODO>(componentName);
  };
}
