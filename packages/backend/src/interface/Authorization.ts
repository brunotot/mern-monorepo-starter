import { type RequestHandler } from "express";

export interface Authorization {
  middleware(): RequestHandler[];
  protect(): RequestHandler;
}
