import { type TODO } from "@org/shared";
import { InjectorMetadataManager } from "@org/backend/config/managers/InjectorMetadataManager";
import { ServiceRegistry } from "@org/backend/config/singletons/ServiceRegistry";

export function autowired(_target: undefined, context: ClassFieldDecoratorContext<TODO, TODO>) {
  const componentName = String(context.name).toLowerCase();
  InjectorMetadataManager.getBy(context).addDependency(componentName);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return function (_value: TODO) {
    return ServiceRegistry.getInstance().inject<TODO>(componentName);
  };
}
