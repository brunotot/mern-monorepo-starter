import type { KcUserRole } from "@org/lib-api-client";

export interface KeycloakUser {
  username: string;
  token: string;
  roles: KcUserRole[];
  name: string;
}
