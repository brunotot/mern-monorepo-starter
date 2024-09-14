import { KeycloakProvider } from "@org/app-vite-react/lib/keycloak-js";
import { QueryClientProvider } from "@org/app-vite-react/lib/@tanstack";
import { MuiStylesProvider } from "@org/app-vite-react/lib/@mui";
import { MuiThemeProvider } from "@org/app-vite-react/lib/@mui";
import { type Provider } from "@org/app-vite-react/ReactApp";

export const providers = [
  KeycloakProvider,
  QueryClientProvider,
  MuiStylesProvider,
  MuiThemeProvider,
] as const satisfies Provider[];
