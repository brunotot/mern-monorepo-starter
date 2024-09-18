import type { ApiKeycloakUser } from "@org/lib-api-client";

export interface AuthorizationRepository {
  findAllUsers(): Promise<ApiKeycloakUser[]>;
  findUserByUsername(username: string): Promise<ApiKeycloakUser | null>;
}
