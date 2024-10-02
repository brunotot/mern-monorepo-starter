import type { ServerInferResponses } from "@ts-rest/core";

import { initClient as tsRestInitClient, initContract as tsRestInitContract } from "@ts-rest/core";

export type { ServerInferResponses };

type FrontendClient = typeof tsRestInitClient;
type BackendClient = typeof tsRestInitContract;

// app-vite-react
export const initClient: FrontendClient = tsRestInitClient;

// app-node-express
export const initContract: BackendClient = tsRestInitContract;

export * from "./TsRestContracts";
export * from "./TsRestOpenApi";
export * from "./TsRestTypes";
