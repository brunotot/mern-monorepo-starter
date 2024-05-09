- [Core Infrastructure](#core-infrastructure)
  - [Type-safe API Interaction](#type-safe-api-interaction)
  - [Decorator-Driven Routes](#decorator-driven-routes)
  - [Dependency Injection](#dependency-injection)
  - [IoC Container Compatibility](#ioc-container-compatibility)
- [Documentation and Logging](#documentation-and-logging)
  - [Auto-Generated API Docs](#auto-generated-api-docs)
  - [Typedoc Source Documentation](#typedoc-source-documentation)
  - [Persistent File Logging](#persistent-file-logging)
- [Authentication and Security](#authentication-and-security)
  - [JWT Authentication](#jwt-authentication)
  - [Role-Based Access Control](#role-based-access-control)
  - [Transactional Decorators](#transactional-decorators)
- [Code Consistency and Style](#code-consistency-and-style)
  - [Consistent Code Architecture](#consistent-code-architecture)
  - [Enhancement Decorators](#enhancement-decorators)

## Core Infrastructure

### Type-safe API Interaction

Ensures fully type-safe communication between server and client using Zod, enhancing reliability and developer experience.

### Decorator-Driven Routes

Utilizes TypeScript decorators to define routes, allowing for cleaner and more intuitive API design.

### Dependency Injection

Implements the latest TypeScript decorators for dependency injection (DI), promoting a modular and testable codebase.

```ts
@Controller("/user")
class UserController {
  @Autowired() userRepository: UserRepository;

  @GetMapping("/hello")
  async helloUser(req, res) {
    const user = await userRepository.getUser("foo");
    res.status(200).send(`Hello ${user.name}`);
  }
}
```

### IoC Container Compatibility

Supports Inversion of Control (IoC) containers to manage class dependencies more efficiently.

## Documentation and Logging

### Auto-Generated API Docs

Incorporates Swagger to generate OpenAPI 3.0.0 specifications automatically, providing up-to-date API documentation.

### Typedoc Source Documentation

Uses Typedoc to auto-generate documentation from the source code, ensuring that documentation stays synchronized with code changes.

### Persistent File Logging

Configures persistent logging mechanisms that write to file systems for comprehensive audit trails and debugging.

## Authentication and Security

### JWT Authentication

Integrates JSON Web Tokens (JWT) for secure and scalable user authentication.

### Role-Based Access Control

Implements a role-based authentication system to manage user permissions effectively.

### Transactional Decorators

Offers enhancement decorators such as `@Transactional` for managing database transactions seamlessly within the service layer.

## Code Consistency and Style

### Consistent Code Architecture

Maintains a consistent code style and architecture, carefully crafted to ensure readability and maintainability.

### Enhancement Decorators

Provides various decorators to enrich the controllers and services with additional functionality, such as logging and security enhancements.

    //"test": "vitest",
    //"build": "rm -rf dist && npm run compile:ts",
    //"start": "export PACKAGE_JSON_VERSION=$(grep -o '\"version\": *\"[^\"]*\"' package.json | awk -F'\"' '{print $4}') && node --no-warnings --loader ts-node/esm --experimental-specifier-resolution=node ./dist/main.js",
