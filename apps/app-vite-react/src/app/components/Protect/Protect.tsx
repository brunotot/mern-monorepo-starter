import type { KeycloakUser } from "@/lib/keycloak-js";
import type { NavigationRouteProtectParam } from "@/server/route-typings";
import type { ReactNode } from "react";

import * as mui from "@mui/material";
import { sigUser } from "@/app/signals/sigUser";

export type ProtectProps = {
  children: ReactNode;
  protect?: NavigationRouteProtectParam;
};

function isAuthorized(user: KeycloakUser, protect?: NavigationRouteProtectParam): boolean {
  if (!protect) return true;

  if (Array.isArray(protect)) {
    return protect.length === 0 || protect.every(p => p(user));
  }

  return protect(user);
}

export function Protect({ children, protect }: ProtectProps) {
  const user = sigUser.value!;

  if (!isAuthorized(user, protect)) {
    return (
      <mui.Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100%"
        bgcolor="background.default"
        p={4}
        borderRadius={2}
        boxShadow={2}
      >
        <mui.Box textAlign="center">
          <mui.Typography variant="h5" color="warning.main" gutterBottom>
            ⚠️ Insufficient Permissions
          </mui.Typography>
          <mui.Typography variant="body1" color="textSecondary">
            You do not have the required permissions to access this content.
          </mui.Typography>
        </mui.Box>
      </mui.Box>
    );
  }

  return <>{children}</>;
}
