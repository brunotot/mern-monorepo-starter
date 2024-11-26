import { IocClassMetadata } from "@/lib/ioc/IocClassMetadata";
import { IocRegistry } from "@/lib/ioc/IocRegistry";

export function autowired(name?: string) {
  return function (_target: undefined, context: ClassFieldDecoratorContext) {
    let computedName = String(context.name).toLowerCase();
    if (name) computedName = name.toLowerCase();
    IocClassMetadata.getInstance(context).addDependency(computedName);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return function () {
      return IocRegistry.getInstance().inject(computedName);
    };
  };
}
