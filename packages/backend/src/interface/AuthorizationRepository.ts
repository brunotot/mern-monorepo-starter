import type * as KC from "@org/backend/config/Keycloak.config";

export interface AuthorizationRepository {
  findAllUsers(): Promise<KC.KeycloakUser[]>;
  findRolesByUserId(id: string): Promise<string[]>;
  findUserByUsername(username: string): Promise<KC.KeycloakUser | null>;
}
