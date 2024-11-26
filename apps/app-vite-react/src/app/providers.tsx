import { ConfirmProvider } from "@/app/provider/ConfirmProvider";
import { SnackbarProvider } from "@/app/provider/SnackbarProvider";
import { MuiStylesProvider, MuiThemeProvider } from "@/lib/@mui";
import { QueryClientProvider } from "@/lib/@tanstack";
import { KeycloakProvider } from "@/lib/keycloak-js";
import { type Provider } from "@/server/ReactApp";

export const providers = [
  MuiStylesProvider,
  MuiThemeProvider,
  SnackbarProvider,
  ConfirmProvider,
  KeycloakProvider,
  QueryClientProvider,
] as const satisfies Provider[];
