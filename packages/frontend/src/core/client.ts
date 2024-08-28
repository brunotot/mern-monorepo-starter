import { initClient } from "@ts-rest/core";
import { contracts } from "@org/shared";

export const client = initClient(contracts, {
  baseUrl: "http://localhost:8081",
  baseHeaders: {},
});
