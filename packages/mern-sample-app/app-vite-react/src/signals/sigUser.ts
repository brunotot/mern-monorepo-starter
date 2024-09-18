import { type KeycloakUser } from "@org/app-vite-react/lib/keycloak-js";
import { signal } from "@preact/signals-react";

export const sigUser = signal<KeycloakUser | null>(null);
