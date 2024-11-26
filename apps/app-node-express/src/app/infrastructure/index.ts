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
 * ### Create custom `Service`
 *
 * ```ts
 * import { inject, autowired } from "@/infrastructure/decorators";
 * import { UserService } from "@/infrastructure/services";
 * import { AnotherService } from "@/infrastructure/services";
 *
 * @inject()
 * class MyService {
 *   @autowired() private userService: UserService;
 *   @autowired() private anotherService: AnotherService;
 * }
 * ```
 */
