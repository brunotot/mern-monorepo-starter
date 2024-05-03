import { initClient } from "@ts-rest/core";
import { CONTRACTS } from "@org/shared";

export const client = initClient(CONTRACTS, {
  baseUrl: "http://localhost:8080",
  baseHeaders: {},
});
