import { signal } from "@preact/signals-react";
import type Keycloak from "keycloak-js";

export const sigKeycloak = signal<Keycloak | null>(null);
