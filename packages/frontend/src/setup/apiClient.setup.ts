import { initClient } from "@ts-rest/core";
import { contracts } from "@org/shared";

export const apiClient = initClient(contracts, {
  baseUrl: import.meta.env.VITE_API_CLIENT_URL,
  baseHeaders: {},
});
