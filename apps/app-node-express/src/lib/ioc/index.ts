/**
 * @packageDocumentation
 *
 * ## Overview
 * This module provides a framework for scanning directories and managing dependency injection using an IoC (Inversion of Control) container,
 * powered by `BottleJs`. It enables the automatic discovery of classes annotated with the **`@inject`** decorator and registers them in the IoC container.
 * The `IocRegistry` class manages the lifecycle and initialization of components, while `IocClassMetadata` handles metadata associated with each component,
 * such as name and dependencies.
 *
 * ## Features
 * - **Automatic Component Discovery**: Scans specified directories for classes with the **`@inject`** decorator.
 * - **IoC Registry**: Manages component registration and dependency resolution using `BottleJs`.
 * - **Dependency Management**: Automatically resolves dependencies between components, ensuring proper initialization order.
 * - **Metadata Management**: Associates metadata such as component names and dependencies with classes through `IocClassMetadata`.
 *
 * ## How to Use
 *
 * ### Scan IoC Modules
 * ```ts
 * import { scanIocModules } from "@/lib/bottlejs";
 *
 * const components = await scanIocModules("/path/to/project", ["src/components", "src/services"]);
 * console.log(components); // Outputs the discovered components and their classes
 * ```
 *
 * ### Initialize IoC Registry
 * ```ts
 * import { IocRegistry } from "@/lib/bottlejs";
 *
 * const registry = IocRegistry.getInstance();
 * registry.iocStartup(components);
 * ```
 *
 * ### Inject Dependencies
 * ```ts
 * const serviceInstance = registry.inject<MyService>("MyService");
 * ```
 */

export * from "@/lib/ioc/IocRegistry";
export * from "@/lib/ioc/IocClassMetadata";
export * from "@/lib/ioc/IocScanner";
export * from "@/lib/ioc/decorators";
