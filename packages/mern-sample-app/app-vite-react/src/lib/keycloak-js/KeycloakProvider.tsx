import type * as KC from "@org/app-vite-react/lib/keycloak-js";
import type { Role } from "@org/lib-api-client";

import { sigUser } from "@org/app-vite-react/app/signals/sigUser";
import { keycloakClient } from "@org/app-vite-react/lib/keycloak-js/KeycloakClient";
import { ReactKeycloakProvider, useKeycloak } from "@react-keycloak/web";
import { jwtDecode } from "jwt-decode";
import { type KeycloakTokenParsed } from "keycloak-js";
import React from "react";
import { StrictMode, type PropsWithChildren } from "react";

const KeycloakImpl = ({ children }: React.PropsWithChildren) => {
  const { keycloak, initialized } = useKeycloak();
  const [keycloakAvailable, setKeycloakAvailable] = React.useState(true);
  const [timeoutExceeded, setTimeoutExceeded] = React.useState(false);

  React.useEffect(() => {
    // Replace with your Keycloak URL (server URL)
    //const keycloakUrl = import.meta.env.VITE_API_KEYCLOAK_URL as string;

    // Check if the Keycloak URL is reachable
    const checkKeycloak = async () => {
      try {
        //const response = await fetch(keycloakUrl, { method: "GET" });
        //if (!response.ok) {
        //  throw new Error(`Keycloak URL is not reachable. Status: ${response.status}`);
        //}
      } catch (error) {
        setKeycloakAvailable(false);
        console.error("Keycloak URL check failed:", error);
      }
    };

    // Perform the health check before initializing Keycloak
    checkKeycloak();

    // Timeout to handle initialization delays
    const timeout = setTimeout(() => {
      if (!initialized) {
        setTimeoutExceeded(true);
        console.error("Keycloak initialization timeout exceeded.");
      }
    }, 10000); // Arbitrary timeout in milliseconds (e.g., 10 seconds)

    return () => clearTimeout(timeout);
  }, [initialized, keycloak.authServerUrl, keycloak.realm]);

  if (!keycloakAvailable) {
    return <div>Error: Keycloak server is not reachable.</div>;
  }

  if (timeoutExceeded) {
    return <div>Error: Keycloak initialization timeout exceeded.</div>;
  }

  if (!initialized) {
    return <div>Waiting on Keycloak...</div>;
  }

  if (!keycloak.authenticated) {
    return <div>Not authenticated</div>;
  }

  return <>{children}</>;
};

function decodeKeycloakToken(keycloakToken: string): KC.KeycloakUser {
  const decoded = jwtDecode<KeycloakTokenParsed>(keycloakToken);

  const username = decoded.preferred_username;
  const givenName: string | undefined = decoded.given_name;
  const familyName: string | undefined = decoded.family_name;
  const name = [givenName, familyName].filter(v => !!v).join(" ") || username;

  const roles: string[] = [
    ...(decoded.realm_access?.roles || []),
    ...(decoded.resource_access?.["app-vite-react"]?.roles || []),
  ];

  const fromToken: KC.KeycloakUser = {
    username,
    token: keycloakToken,
    roles: roles as Role[],
    name,
  };

  return fromToken;
}

export function KeycloakProvider({ children }: PropsWithChildren) {
  return (
    <ReactKeycloakProvider
      initOptions={{ onLoad: "login-required" }}
      authClient={keycloakClient}
      onTokens={({ token }) => {
        if (!token) {
          console.error("No token received from Keycloak");
          return;
        }
        sigUser.value = decodeKeycloakToken(token);
      }}
    >
      <KeycloakImpl>
        <StrictMode>{children}</StrictMode>
      </KeycloakImpl>
    </ReactKeycloakProvider>
  );
}
