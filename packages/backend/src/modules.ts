import { type TODO } from "@org/shared";
import { KeycloakAuth } from "@org/backend/infrastructure/security/KeycloakAuth";
import { UserController } from "@org/backend/infrastructure/controllers/UserController";
import { UserRepository } from "@org/backend/infrastructure/repository/impl/UserRepository";
import { KeycloakRepository } from "@org/backend/infrastructure/repository/impl/KeycloakRepository";
import { ErrorLogRepository } from "@org/backend/infrastructure/repository/impl/ErrorLogRepository";
import { UserService } from "@org/backend/infrastructure/service/UserService";

export type NoArgsClass<T = TODO> = new () => T;

const MODULES: Record<string, NoArgsClass> = {
  KeycloakAuth,
  UserController,
  UserRepository,
  ErrorLogRepository,
  UserService,
  KeycloakRepository,
};

export default MODULES;
