import { type KeycloakTokenParsed } from "keycloak-js";
import { jwtDecode } from "jwt-decode";

export interface KeycloakUser {
  firstName?: string;
  lastName?: string;
  userName?: string;
  token?: string;
  locale?: string;
  companyId?: string;
  roles: string[];
  email?: string;
}

export function decodeKeycloakToken(keycloakToken: string): KeycloakUser {
  const decoded = jwtDecode<KeycloakTokenParsed>(keycloakToken);
  const fromToken: KeycloakUser = {
    userName: decoded["preferred_username"],
    email: decoded["email"],
    firstName: decoded["given_name"],
    lastName: decoded["family_name"],
    companyId: decoded["companyId"],
    locale: decoded["locale"],
    token: keycloakToken,
    roles: decoded["realm_access"]?.["roles"] ?? [],
  };
  return fromToken;
}
