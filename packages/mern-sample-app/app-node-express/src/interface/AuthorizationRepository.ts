import type * as KC from "@org/app-node-express/lib/keycloak-connect";

export interface AuthorizationRepository {
  findAllUsers(): Promise<KC.KeycloakUser[]>;
  findRolesByUserId(id: string): Promise<string[]>;
  findUserByUsername(username: string): Promise<KC.KeycloakUser | null>;
}
