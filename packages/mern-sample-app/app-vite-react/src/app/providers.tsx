import { ConfirmProvider } from "@org/app-vite-react/app/provider/ConfirmProvider";
import { MuiStylesProvider, MuiThemeProvider } from "@org/app-vite-react/lib/@mui";
import { QueryClientProvider } from "@org/app-vite-react/lib/@tanstack";
import { KeycloakProvider } from "@org/app-vite-react/lib/keycloak-js";
import { type Provider } from "@org/app-vite-react/server/ReactApp";

export const providers = [
  MuiStylesProvider,
  MuiThemeProvider,
  ConfirmProvider,
  KeycloakProvider,
  QueryClientProvider,
] as const satisfies Provider[];
