import type { ClientArgs } from "@ts-rest/core";

import { sigUser } from "@org/app-vite-react/app/signals/sigUser";
import { contracts, initClient } from "@org/lib-api-client";
import { initTsrReactQuery } from "@ts-rest/react-query/v5";

const API_CLIENT_URL = import.meta.env.VITE_API_CLIENT_URL;

if (!API_CLIENT_URL) {
  throw new Error("Env variable: 'API_CLIENT_URL' is not defined");
}

const BASE_HEADERS: ClientArgs[keyof ClientArgs] = {
  authorization: () => (sigUser.value ? `bearer ${sigUser.value.token}` : ""),
};

export const tsrQuery = initTsrReactQuery(contracts, {
  baseUrl: API_CLIENT_URL,
  baseHeaders: BASE_HEADERS,
});

export const tsrClient = initClient(contracts, {
  baseUrl: API_CLIENT_URL,
  baseHeaders: BASE_HEADERS,
});
