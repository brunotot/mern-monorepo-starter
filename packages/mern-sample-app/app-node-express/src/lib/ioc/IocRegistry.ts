import { IocClassMetadata } from "@org/app-node-express/lib/ioc";
import { type TODO, type NoArgsClass } from "@org/lib-commons";

export class IocRegistry {
  private static instance: IocRegistry;

  public readonly registry: Map<string, unknown>;

  public static getInstance() {
    IocRegistry.instance ??= new IocRegistry();
    return IocRegistry.instance;
  }

  private constructor() {
    this.registry = new Map();
  }

  #injectLocal<T = TODO>(name: string): T {
    return this.registry.get(name.toLowerCase()) as T;
  }

  public inject<T = TODO>(nameOrContext: string | DecoratorContext | NoArgsClass): T {
    if (typeof nameOrContext === "string") return this.#injectLocal<T>(nameOrContext);
    const containerName = IocClassMetadata.getInstance(nameOrContext).getName();
    return this.#injectLocal<T>(containerName);
  }

  public iocStartup(registryData: Record<string, NoArgsClass>) {
    this.#setupComponentNameMetadata(registryData);
    const componentClasses = Object.values(registryData);
    const dependencySchema = this.#getDependencySchema(componentClasses);
    this.#validateDependencySchema(dependencySchema);
    const sortedInjectionClasses = this.#getSortedInjectionClasses(
      componentClasses,
      dependencySchema,
    );
    for (const Class of sortedInjectionClasses) {
      const name = IocClassMetadata.getInstance(Class).getName();
      const instance = new Class();
      this.registry.set(name, instance);
    }
  }

  #getSortedInjectionClasses(classes: NoArgsClass[], dependencySchema: Record<string, string[]>) {
    const sorted: NoArgsClass[] = [];
    const visited = new Set<string>();
    const tempMarks = new Set<string>();

    function visit(className: string) {
      if (tempMarks.has(className)) {
        throw new Error(`Circular dependency detected: ${className}`);
      }
      if (!visited.has(className)) {
        tempMarks.add(className);
        const dependencies = dependencySchema[className] || [];
        dependencies.forEach(dep => visit(dep));
        tempMarks.delete(className);
        visited.add(className);

        const classInstance = classes.find(
          cls => IocClassMetadata.getInstance(cls).getName() === className,
        );
        if (classInstance) {
          sorted.push(classInstance);
        }
      }
    }

    classes.forEach(classItem => {
      const className = IocClassMetadata.getInstance(classItem).getName();
      visit(className);
    });

    return sorted;
  }

  #getDependencySchema(classes: NoArgsClass[]): Record<string, string[]> {
    return classes.reduce((acc, Class) => {
      const iocClassMetadata = IocClassMetadata.getInstance(Class);
      const name = iocClassMetadata.getName();
      const dependencies = iocClassMetadata.getDependencies();
      return { ...acc, [name]: dependencies };
    }, {});
  }

  #setupComponentNameMetadata(config: Record<string, NoArgsClass>) {
    Object.entries(config).forEach(([key, constructor]) => {
      IocClassMetadata.getInstance(constructor).setName(key);
    });
  }

  // Private method to validate the dependency schema
  #validateDependencySchema(schema: Record<string, string[]>): void | never {
    // Helper function to detect circular dependency using Depth First Search (DFS)
    const hasCircularDependency = (key: string, visited: Set<string>, stack: string[]): boolean => {
      // Mark the current key as visited and add to the current recursion stack
      if (!visited.has(key)) {
        visited.add(key);
        stack.push(key);

        // Recursively check all the dependencies of the current key
        for (const dep of schema[key] || []) {
          // If the dependency is not visited, recursively visit it
          if (!visited.has(dep) && hasCircularDependency(dep, visited, stack)) {
            return true;
          }
          // If the dependency is already in the current recursion stack, it's a circular dependency
          if (stack.includes(dep)) {
            stack.push(dep); // Add the conflicting dependency for error reporting
            return true;
          }
        }
      }

      // Remove the key from the current recursion stack
      stack.pop();
      return false;
    };

    // Set to track visited nodes and call DFS for each key in the schema
    const visited = new Set<string>();

    // Iterate over all keys in the schema
    for (const key of Object.keys(schema)) {
      const stack: string[] = [];

      // If a circular dependency is detected, throw an error with detailed message
      if (hasCircularDependency(key, visited, stack)) {
        const classesInConflict = stack.join(" -> ");

        // Create the factory class suggestion based on the conflicting keys
        const factoryClass = Array.from(new Set(stack))
          .map(
            dep =>
              `  @autowired() private ${dep.toLowerCase()}: ${dep.charAt(0).toUpperCase() + dep.slice(1)};`,
          )
          .join("\n");

        throw new Error(
          `Circular dependency injection detected on candidate "${key}".\n` +
            `The following classes are in conflict: ${classesInConflict}\n\n` +
            `To resolve this issue, consider writing a factory class composed of circular candidates.\n` +
            `In this specific case, it would be:\n\n` +
            `class MyFactory {\n${factoryClass}\n}`,
        );
      }
    }
  }
}
