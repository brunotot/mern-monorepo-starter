/**
 * @packageDocumentation
 *
 * ## Overview
 * This module provides functionality for interacting with Keycloak, including managing OAuth tokens and handling Keycloak-related API requests.
 * The `KeycloakTokenManager` handles token fetching and caching for efficient API calls, while the `KeycloakDao` provides methods for making authenticated API requests to the Keycloak admin endpoints.
 * Additionally, this module includes session management with `express-session` and `memorystore` to manage user sessions securely.
 *
 * ## Features
 * - **Keycloak Token Management**: Fetch and cache OAuth tokens for authentication with Keycloak.
 * - **Keycloak Admin API Interaction**: Provides helper methods for making authenticated requests to Keycloak admin endpoints.
 * - **Session Management**: Implements session management with `express-session` and `memorystore` for handling Keycloak sessions.
 * - **Memory Store for Sessions**: Uses `memorystore` to store sessions with automatic expiration handling.
 *
 * ## How to Use
 *
 * ### Fetch a Keycloak Token
 * ```ts
 * import { KeycloakTokenManager } from "@/lib/keycloak";
 *
 * const tokenManager = new KeycloakTokenManager();
 * const token = await tokenManager.getToken();
 * console.log(token);  // Outputs the fetched token
 * ```
 *
 * ### Make a Keycloak Admin API Request
 * ```ts
 * import { KeycloakDao } from "@/lib/keycloak";
 *
 * const keycloakDao = new KeycloakDao();
 * const userData = await keycloakDao.get("/users");
 * console.log(userData);  // Outputs data fetched from Keycloak
 * ```
 *
 * ### Set Up Keycloak Session
 * ```ts
 * import { buildKeycloakSession } from "@/lib/keycloak";
 *
 * app.use(buildKeycloakSession());
 * ```
 */

export * from "@/lib/keycloak/KeycloakMemoryStore";
export * from "@/lib/keycloak/KeycloakTokenManager";
export * from "@/lib/keycloak/KeycloakDao";
export * from "@/lib/keycloak/KeycloakSession";
