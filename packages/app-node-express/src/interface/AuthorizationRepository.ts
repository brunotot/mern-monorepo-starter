import type * as KC from "@org/app-node-express/config/Keycloak.config";

export interface AuthorizationRepository {
  findAllUsers(): Promise<KC.KeycloakUser[]>;
  findRolesByUserId(id: string): Promise<string[]>;
  findUserByUsername(username: string): Promise<KC.KeycloakUser | null>;
}
