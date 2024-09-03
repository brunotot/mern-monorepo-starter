import { signal } from "@preact/signals-react";
import { type KeycloakTokenParsed, type KeycloakRoles } from "keycloak-js";
import { jwtDecode } from "jwt-decode";

export interface KeycloakResourceAccess {
  [key: string]: KeycloakRoles;
}

export function decodeUserData(token: string): UserData {
  const decoded = jwtDecode<KeycloakTokenParsed>(token);
  const fromToken: UserData = {
    userName: decoded["preferred_username"],
    email: decoded["email"],
    firstName: decoded["given_name"],
    lastName: decoded["family_name"],
    companyId: decoded["companyId"],
    locale: decoded["locale"],
    token: token,
    roles: decoded["realm_access"]?.["roles"] ?? [],
  };
  return fromToken;
}

export interface UserData {
  firstName?: string;
  lastName?: string;
  userName?: string;
  token?: string;
  locale?: string;
  companyId?: string;
  roles: string[];
  email?: string;
}

export const sigUser = signal<UserData | null>(null);
