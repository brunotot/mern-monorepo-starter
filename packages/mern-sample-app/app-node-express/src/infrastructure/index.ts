/**
 * @packageDocumentation
 *
 * ## Overview
 * The `infrastructure` directory contains the foundational files and folders specific to the application, including controllers, middleware, repositories, services, and decorators.
 * It provides core functionality such as user management, routing, security, and dependency injection, while also allowing flexibility for project-specific customizations.
 * The `decorators` subdirectory contains core decorators used across the application, though it allows for additional custom decorators if needed by the project.
 *
 * Unlike core libraries, this folder is project-specific and may vary across implementations. It includes:
 *
 * - **Controllers**: Handle user-related API requests and route interactions.
 * - **Decorators**: Provide core decorators for IoC, autowiring, and route contract management.
 * - **Middleware**: Manages request authorization, logging, session handling, and MongoDB session context.
 * - **Repository**: Abstracts database interactions with Keycloak for user data retrieval.
 * - **Services**: Provides business logic, including user-related services, with mappings from Keycloak to local data models.
 *
 * ## Features
 * - **Controllers**: Defines controllers like `UserController` that handle user-related requests and route mappings using contracts and secured middleware.
 * - **Custom Decorators**: Core decorators for injecting dependencies (`inject`), autowiring (`autowired`), and handling routes with transaction support (`contract`).
 * - **Middleware Management**: Integrates Keycloak for authorization (`withAuthorization`), session management (`withRouteSession`), request logging (`withMorgan`), and context handling (`withRouteContext`).
 * - **Repository Pattern**: Provides an abstraction over Keycloak Admin API interactions through `UserRepository`, which handles user data retrieval.
 * - **Service Layer**: The `UserService` class handles core business logic around user management, including mapping Keycloak data to the app’s internal format.
 *
 * ## How to Use
 *
 * ### Using Controllers
 * Define routes in `UserController` using contracts and secured middleware:
 * ```ts
 * import { UserController } from "@org/app-node-express/infrastructure/controllers";
 *
 * const userController = new UserController();
 * await userController.findAll();
 * ```
 *
 * ### Using Custom Decorators
 * The `inject` and `autowired` decorators provide dependency injection and autowiring of services:
 * ```ts
 * import { inject, autowired } from "@org/app-node-express/infrastructure/decorators";
 *
 * @inject()
 * class MyService {
 *   @autowired("UserService")
 *   private userService: UserService;
 * }
 * ```
 *
 * ### Middleware Integration
 * Use middleware to handle authorization, logging, session management, and route contexts:
 * ```ts
 * import { withAuthorization, withMorgan, withRouteSession, withRouteContext } from "@org/app-node-express/infrastructure/middleware";
 *
 * app.use(withAuthorization());
 * app.use(withMorgan());
 * app.use(withRouteSession());
 * app.use(withRouteContext());
 * ```
 *
 * ### Repositories and Services
 * The `UserRepository` and `UserService` abstract interactions with Keycloak and provide business logic for user data:
 * ```ts
 * const userService = new UserService();
 * const users = await userService.findAll();
 * ```
 *
 * ## Customization
 * - **Controllers**: Extend or create new controllers using the contract pattern with decorators like `contract` and secured middleware.
 * - **Decorators**: Add custom decorators as needed by extending the core decorators in the `decorators` subdirectory.
 * - **Middleware**: Adjust or create custom middleware for handling requests, authorization, logging, or context management based on specific project needs.
 * - **Repositories and Services**: Extend or modify the repository and service layers to handle additional business logic or external API interactions.
 */
