import { type NoArgsClass } from "@org/lib-commons";

import { KeycloakAuthorization } from "@org/app-node-express/lib/keycloak";
import { UserController } from "@org/app-node-express/infrastructure/controllers/UserController";
import { UserRepository } from "@org/app-node-express/infrastructure/repository/impl/UserRepository";
import { KeycloakRepository } from "@org/app-node-express/lib/keycloak";
import { UserService } from "@org/app-node-express/infrastructure/service/UserService";

export function scanIocModules() {
  return {
    Authorization: KeycloakAuthorization,
    UserController,
    UserRepository,
    UserService,
    AuthorizationRepository: KeycloakRepository,
  } as const satisfies Record<string, NoArgsClass>;
}
