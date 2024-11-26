/**
 * @packageDocumentation
 *
 * ## Overview
 * The `lib` directory provides several core modules for the application, including utilities for RESTful routes, IoC (Inversion of Control) dependency injection,
 * Keycloak integration for authentication and authorization, and MongoDB for data persistence. Each module is designed to streamline specific aspects of server-side
 * application development, from route management and dependency injection to session handling and database operations.
 *
 * ## Features
 * - **REST API Support**: Provides type-safe route handling, Swagger documentation, and middleware integration for Express routes using `@ts-rest`.
 * - **IoC and Dependency Injection**: Manages class metadata and dependencies through the `IocRegistry` and `IocClassMetadata` classes, enabling efficient dependency injection.
 * - **Keycloak Integration**: Handles Keycloak authentication and token management, including session storage via `express-session` and `memorystore`.
 * - **MongoDB Integration**: Simplifies database operations with MongoDB, including CRUD operations, pagination, and transaction management.
 *
 * ## How to Use
 *
 * ### Imports
 *
 * ```ts
 * import { initializeExpressRoutes } from "@/lib";
 * import { initializeSwagger } from "@/lib";
 * import { IocRegistry } from "@/lib";
 * import { buildKeycloakSession } from "@/lib";
 * import { KeycloakTokenManager } from "@/lib";
 * import { MongoDatabaseService } from "@/lib";
 * import { MongoRepository } from "@/lib";
 * ```
 *
 * ### REST API Integration (`@ts-rest`)
 * - **Initialize Express Routes**:
 * ```ts
 * const app = express();
 * initializeExpressRoutes(app);
 * ```
 * - **Swagger Integration**:
 * ```ts
 * initializeSwagger({
 *   app,
 *   oauth2RedirectUrl: "/oauth2-redirect",
 *   version: "1.0.0",
 *   cssPath: "/css/swagger.css",
 *   jsPath: "/js/swagger.js",
 *   endpoint: "/api-docs",
 * });
 * ```
 *
 * ### IoC and Dependency Injection (`bottlejs`)
 * - **Startup IoC Registry**:
 * ```ts
 * IocRegistry.getInstance().iocStartup(components);
 * ```
 *
 * ### Keycloak Integration (`keycloak`)
 * - **Keycloak Session Handling**:
 * ```ts
 * const app = express();
 * app.use(buildKeycloakSession());
 * ```
 * - **Fetch Keycloak Token**:
 * ```ts
 * const token = await new KeycloakTokenManager().getToken();
 * ```
 *
 */

export * from "@/lib/@ts-rest";
export * from "@/lib/ioc";
export * from "@/lib/keycloak";
export * from "@/lib/winston";
