import { type KeycloakUser } from "@org/app-vite-react/lib/keycloak-js";
import { signal } from "@preact/signals-react";

type LocalUser = (KeycloakUser & { name: string }) | null;

/*const DEFAULT_VALUE: LocalUser = {
  username: "admin",
  token: "",
  roles: ["avr-admin"],
  name: "Admin",
};*/

const DEFAULT_VALUE: LocalUser = null;

export const sigUser = signal<LocalUser>(DEFAULT_VALUE);
