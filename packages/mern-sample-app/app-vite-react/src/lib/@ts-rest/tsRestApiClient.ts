import { contracts } from "@org/lib-api-client";
import { initClient } from "@ts-rest/core";

const API_CLIENT_URL = import.meta.env.VITE_API_CLIENT_URL;

if (!API_CLIENT_URL) {
  throw new Error("Env variable: 'API_CLIENT_URL' is not defined");
}

export const tsRestApiClient = initClient(contracts, {
  baseUrl: API_CLIENT_URL,
  baseHeaders: {},
});
