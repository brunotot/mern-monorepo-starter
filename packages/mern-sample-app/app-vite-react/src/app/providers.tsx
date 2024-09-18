import { MuiStylesProvider , MuiThemeProvider } from "@org/app-vite-react/lib/@mui";
import { QueryClientProvider } from "@org/app-vite-react/lib/@tanstack";
import { KeycloakProvider } from "@org/app-vite-react/lib/keycloak-js";
import { type Provider } from "@org/app-vite-react/ReactApp";

export const providers = [
  KeycloakProvider,
  QueryClientProvider,
  MuiStylesProvider,
  MuiThemeProvider,
] as const satisfies Provider[];
