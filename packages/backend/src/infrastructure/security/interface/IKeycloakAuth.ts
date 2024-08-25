import { type RequestHandler } from "express";

export interface IKeycloakAuth {
  middleware(): RequestHandler[];
  protect(): RequestHandler;
}
