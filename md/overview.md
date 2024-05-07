# Dependencies

@org/backend

| Name                      | Version            | Description                                                               |
| ------------------------- | ------------------ | ------------------------------------------------------------------------- |
| @anatine/zod-openapi      | ^2.2.5             | Used for generating OpenAPI documentation from Zod schemas                |
| @org/shared               | file:../shared/src | Contains shared code, models, and types used by both backend and frontend |
| @ts-rest/core             | ^3.45.0            | Core library for building the TypeScript REST API                         |
| @ts-rest/express          | ^3.45.0            | Integrates the @ts-rest/core library with Express.js                      |
| @ts-rest/open-api         | ^3.45.0            | Generates OpenAPI documentation from the @ts-rest/core API                |
| @tsvdec/core              | ^2.0.11            | Provides core functionality for using TypeScript decorators               |
| @tsvdec/decorators        | ^1.0.7             | Collection of decorators used throughout the codebase                     |
| bcrypt                    | ^5.1.1             | Used for hashing and verifying user passwords                             |
| body-parser               | ^1.20.2            | Parses incoming request bodies in the Express.js middleware               |
| bottlejs                  | ^2.0.1             | Inversion of Control (IoC) container for dependency injection             |
| compression               | ^1.7.4             | Compresses responses to reduce data transfer                              |
| cookie-parser             | ^1.4.6             | Parses cookie headers in incoming requests                                |
| cors                      | ^2.8.5             | Provides a middleware for enabling CORS in the Express.js app             |
| cross-dirname             | ^0.1.0             | Utility for getting the directory path of a file                          |
| dotenv                    | ^16.4.5            | Loads environment variables from .env files                               |
| express                   | ^4.18.2            | The web framework used for building the backend API                       |
| express-rate-limit        | ^7.2.0             | Provides rate limiting to protect against brute force attacks             |
| helmet                    | ^7.1.0             | Collection of security middleware for Express.js                          |
| hpp                       | ^0.2.3             | Protects against HTTP Parameter Pollution attacks                         |
| http-status               | ^1.7.4             | Utility for working with HTTP status codes                                |
| jsonwebtoken              | ^9.0.2             | Used for generating and verifying JSON Web Tokens (JWT)                   |
| mongodb                   | ^6.5.0             | The official MongoDB driver for Node.js                                   |
| morgan                    | ^1.10.0            | HTTP request logger middleware for Express.js                             |
| swagger-jsdoc             | ^6.2.8             | Generates OpenAPI documentation from JSDoc comments                       |
| swagger-ui-express        | ^5.0.0             | Renders the Swagger UI for the OpenAPI documentation                      |
| winston                   | ^3.11.0            | Logging library used for application logging                              |
| winston-daily-rotate-file | ^5.0.0             | Winston transport for logging to a rotating file                          |
| zod                       | ^3.22.5            | TypeScript-first schema validation library used throughout the project    |
