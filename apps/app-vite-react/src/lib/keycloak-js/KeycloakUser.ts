import type { Role } from "@org/lib-api-client";

export interface KeycloakUser {
  username: string;
  token: string;
  roles: Role[];
  name: string;
}
