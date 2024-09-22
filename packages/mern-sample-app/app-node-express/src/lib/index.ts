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
 * ### REST API Integration (`@ts-rest`)
 * - **Initialize Express Routes**:
 * ```ts
 * import { initializeExpressRoutes } from "@org/app-node-express/lib";
 * const app = express();
 * initializeExpressRoutes(app);
 * ```
 * - **Swagger Integration**:
 * ```ts
 * import { initializeSwagger } from "@org/app-node-express/lib";
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
 * import { IocRegistry } from "@org/app-node-express/lib/bottlejs";
 * const registry = IocRegistry.getInstance();
 * registry.iocStartup(components);
 * ```
 *
 * ### Keycloak Integration (`keycloak`)
 * - **Keycloak Session Handling**:
 * ```ts
 * import { buildKeycloakSession } from "@org/app-node-express/lib/keycloak";
 * app.use(buildKeycloakSession());
 * ```
 * - **Fetch Keycloak Token**:
 * ```ts
 * import { KeycloakTokenManager } from "@org/app-node-express/lib/keycloak";
 * const tokenManager = new KeycloakTokenManager();
 * const token = await tokenManager.getToken();
 * ```
 *
 * ### MongoDB Integration (`mongodb`)
 * - **Initialize MongoDB Client**:
 * ```ts
 * import { MongoDatabaseService } from "@org/app-node-express/lib/mongodb";
 * const dbService = MongoDatabaseService.getInstance();
 * dbService.client = MongoDatabaseService.buildMongoClient();
 * await dbService.client.connect();
 * ```
 * - **Use MongoDB Repository for CRUD**:
 * ```ts
 * class MyRepository extends MongoRepository<MyDocument> {
 *   constructor() {
 *     super(MyDocumentSchema, ["name", "email"]);
 *   }
 * }
 * const repo = new MyRepository();
 * const allDocuments = await repo.findAll();
 * ```
 *
 * ## Customization
 * - **REST Routes and Middleware**: Customize REST routes by adding or modifying middleware via the `RouteMiddlewareFactory` and handling complex route contracts.
 * - **IoC Management**: Add or modify components in the IoC container using the `IocRegistry`, and extend `IocClassMetadata` for custom dependency management.
 * - **Keycloak API Access**: Extend `KeycloakDao` for additional API interactions or adjust session configurations to suit specific authentication requirements.
 * - **MongoDB Operations**: Extend the `MongoRepository` class for advanced database operations such as filtering, sorting, and custom queries.
 */

export * from "./@ts-rest";
export * from "./bottlejs";
export * from "./keycloak";
export * from "./mongodb";
export * from "./winston";
