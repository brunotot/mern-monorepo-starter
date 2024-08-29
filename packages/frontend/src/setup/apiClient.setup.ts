import { initClient } from "@ts-rest/core";
import { contracts } from "@org/shared";

console.log(import.meta.env);

const API_CLIENT_URL = import.meta.env.VITE_API_CLIENT_URL;

if (!API_CLIENT_URL) {
  throw new Error("Env variable: 'API_CLIENT_URL' is not defined");
}

export const apiClient = initClient(contracts, {
  baseUrl: API_CLIENT_URL,
  baseHeaders: {},
});
