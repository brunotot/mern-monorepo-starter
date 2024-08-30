import { type TODO } from "@org/lib-commons";
import { InjectorMetadataManager } from "@org/app-node-express/config/InjectorMetadataManager.config";
import { iocRegistry } from "@org/app-node-express/setup/registry.setup";

export function autowired(_target: undefined, context: ClassFieldDecoratorContext<TODO, TODO>) {
  const componentName = String(context.name).toLowerCase();
  InjectorMetadataManager.getBy(context).addDependency(componentName);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return function (_value: TODO) {
    return iocRegistry.inject<TODO>(componentName);
  };
}
