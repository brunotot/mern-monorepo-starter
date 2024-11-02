import { MuiStylesProvider, MuiThemeProvider } from "@org/app-vite-react/lib/@mui";
import { QueryClientProvider } from "@org/app-vite-react/lib/@tanstack";
import { KeycloakProvider } from "@org/app-vite-react/lib/keycloak-js";
import { ConfirmProvider } from "@org/app-vite-react/lib/material-ui-confirm";
import { type Provider } from "@org/app-vite-react/server/ReactApp";

export const providers = [
  ConfirmProvider,
  KeycloakProvider,
  QueryClientProvider,
  MuiStylesProvider,
  MuiThemeProvider,
] as const satisfies Provider[];
