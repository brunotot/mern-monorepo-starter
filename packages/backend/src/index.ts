/**
 * @packageDocumentation This package provides a set of decorators, domain, infrastructure, and web components for building a backend application.
 */

import "@types";

import "./config/zod/environment";

import "./decorators/config/bottlejs";

import "./config/logger";

import "./infrastructure/middleware/globals/index";

import "./infrastructure/repository/impl/UserRepositoryImpl";

import "./infrastructure/service/impl/UserServiceImpl";

import "./web/controllers/AuthController";

import "./web/controllers/UserController";

export * from "./internal";
