import { IocClassMetadata, IocRegistry } from "@org/app-node-express/lib/bottlejs";

export function autowired(name?: string) {
  return function (_target: undefined, context: ClassFieldDecoratorContext) {
    const fieldName = String(context.name);
    const computedName = name?.toLowerCase() ?? fieldName.toLowerCase();
    IocClassMetadata.getInstance(context).addDependency(computedName);

    return function () {
      return IocRegistry.getInstance().inject(computedName);
    };
  };
}
