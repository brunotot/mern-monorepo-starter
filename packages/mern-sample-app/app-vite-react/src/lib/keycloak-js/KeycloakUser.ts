export type KeycloakUserRole = "admin" | "user";

export interface KeycloakUser {
  username: string;
  token: string;
  roles: KeycloakUserRole[];
  name: string;
}
