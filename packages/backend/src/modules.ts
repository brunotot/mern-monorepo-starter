import { type TODO } from "@org/shared";
import { UserController } from "@org/backend/infrastructure/controllers/UserController";
import { UserRepository } from "@org/backend/infrastructure/repository/impl/UserRepository";
import { KeycloakRepository } from "@org/backend/infrastructure/repository/impl/KeycloakRepository";
import { ErrorLogRepository } from "@org/backend/infrastructure/repository/impl/ErrorLogRepository";
import { UserService } from "@org/backend/infrastructure/service/UserService";
import { ErrorLogService } from "@org/backend/infrastructure/service/ErrorLogService";

export type NoArgsClass<T = TODO> = new () => T;

const MODULES: NoArgsClass[] = [
  UserController,
  UserRepository,
  ErrorLogRepository,
  UserService,
  ErrorLogService,
  KeycloakRepository,
];

export default MODULES;
