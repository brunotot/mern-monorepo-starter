import type { KcUserRole } from "@org/lib-api-client";
import type { ReactNode } from "react";

import * as mui from "@mui/material";
import { sigUser } from "@org/app-vite-react/signals/sigUser";

export type ProtectProps = {
  children: ReactNode;
  roles: KcUserRole[];
};

export function Protect({ children, roles }: ProtectProps) {
  const user = sigUser.value;

  if (!user) {
    // Not authenticated
    return (
      <mui.Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100%"
        bgcolor="background.paper"
        p={4}
        borderRadius={2}
        boxShadow={2}
      >
        <mui.Box textAlign="center">
          <mui.Typography variant="h5" color="error" gutterBottom>
            🔒 Restricted Access
          </mui.Typography>
          <mui.Typography variant="body1" color="textSecondary" gutterBottom>
            You need to sign in to view this content.
          </mui.Typography>
          <mui.Button
            variant="contained"
            color="primary"
            onClick={() => (window.location.href = "/login")} // Replace with your login URL
          >
            Sign In
          </mui.Button>
        </mui.Box>
      </mui.Box>
    );
  }

  if (user.roles.length === 0) {
    return <>{children}</>;
  }

  const hasRole = user.roles.some(r => roles.includes(r));

  if (!hasRole) {
    // Authenticated but lacks permissions
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

  // Authenticated and authorized
  return <>{children}</>;
}
