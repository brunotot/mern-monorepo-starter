import { type Class } from "@org/shared";
import { ServiceRegistry } from "../../dist/config/singletons/ServiceRegistry";

export function getComponent<C extends Class>(clazz: C): InstanceType<C> {
  return ServiceRegistry.getInstance().inject<C>(clazz.name.toLowerCase()) as InstanceType<C>;
}
