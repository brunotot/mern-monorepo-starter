import type { NoArgsClass } from "@org/lib-commons";

import { IocClassMetadata } from "@org/app-node-express/ioc/IocClassMetadata";

export function inject<T extends NoArgsClass>(name?: string) {
  return function (target: T, context: ClassDecoratorContext<T>) {
    let computedName = context.name?.toLowerCase();
    if (name) computedName = name.toLowerCase();
    if (!computedName)
      throw new Error("Parameter 'name' must be provided when using @inject() on anonymous class");
    IocClassMetadata.getInstance(target).setName(computedName);
    IocClassMetadata.getInstance(context).setName(computedName);
    return target;
  };
}
