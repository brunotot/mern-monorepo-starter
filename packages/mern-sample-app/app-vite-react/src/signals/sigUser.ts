import { signal } from "@preact/signals-react";
import { type KeycloakUser } from "@org/app-vite-react/lib/keycloak-js";

export const sigUser = signal<KeycloakUser | null>(null);
