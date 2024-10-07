/**
 * @packageDocumentation
 *
 * ## Overview
 * This module provides decorators and utility functions for dependency injection, route handling, and transaction management
 * within an Express application using the IoC (Inversion of Control) pattern. The `inject` and `autowired` decorators facilitate
 * automatic dependency injection, while the `contract` decorator integrates route handlers with transaction support.
 *
 * ## Features
 * - **Dependency Injection**: The `inject` decorator registers a class in the IoC container with a specified or inferred name.
 * - **Autowired Fields**: The `autowired` decorator automatically injects dependencies into class fields by resolving them from the IoC container.
 * - **Route Contract Handling**: The `contract` decorator handles route definition, transaction management, and error handling for routes.
 * - **Transaction Management**: Automatically manages MongoDB transactions within route handlers.
 *
 * ## How to Use
 *
 * ### Injecting Dependencies
 * Use the `inject` decorator to register a class in the IoC container:
 * ```ts
 * import { inject } from "@org/app-node-express/infrastructure/decorators";
 *
 * @inject()
 * class MyService {
 *   // Service logic here
 * }
 * ```
 *
 * ### Autowiring Dependencies
 * Use the `autowired` decorator to inject dependencies into class fields:
 * ```ts
 * import { inject, autowired } from "@org/app-node-express/infrastructure/decorators";
 *
 * @inject()
 * class MyController {
 *   @autowired() myService: MyService;
 * }
 * ```
 *
 * ### Handling Routes with Transaction Support
 * Use the `contract` decorator to define routes that include middleware and MongoDB transaction management:
 * ```ts
 * import { inject, contract } from "@org/app-node-express/infrastructure/decorators";
 * import { MyRouteContract } from "@org/lib-api-client";
 *
 * @inject()
 * class MyController {
 *   @contract(MyRouteContract)
 *   async handleRoute(data: RouteInput<MyRouteContract>) {
 *     // Business logic
 *   }
 * }
 * ```
 */

export * from "./contract";
export * from "./createContractHandler";
