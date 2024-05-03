import type { Request, Response, NextFunction } from "express";

export type RouteMiddleware = (req: Request, res: Response, next: NextFunction) => void;
