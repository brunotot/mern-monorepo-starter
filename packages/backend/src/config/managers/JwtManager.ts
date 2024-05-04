import { type TODO, ErrorResponse } from "@org/shared";
import { type Request, type Response } from "express";
import type { VerifyErrors } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import { Environment } from "@org/backend/config/singletons/Environment";

export type TokenData = {
  token: string;
  data: TODO;
};

export type JwtPrincipal = {
  username: string;
  roles: string[];
};

export class JwtManager {
  readonly #req: Request;

  static getBy(req: Request): JwtManager {
    return new JwtManager(req);
  }

  private constructor(req: Request) {
    this.#req = req;
  }

  public async verifyToken(secret: string): Promise<TokenData> {
    return new Promise((resolve, reject) => {
      const req = this.#req;
      const authHeader = req.headers.authorization || req.headers.Authorization;
      const authHeaderSanitized = Array.isArray(authHeader) ? authHeader[0] : authHeader;
      const details = "";
      const metadata = {};
      if (!authHeaderSanitized?.startsWith("Bearer "))
        return reject(new ErrorResponse(req.originalUrl, 401, details, metadata));
      const token = authHeaderSanitized.split(" ")[1];

      jwt.verify(token, secret, (err: VerifyErrors | null, decoded: TODO) => {
        if (err || !decoded) {
          reject(new ErrorResponse(req.originalUrl, 403, details, metadata));
        } else {
          resolve({
            token,
            data: decoded,
          });
        }
      });
    });
  }

  public generateAccessToken(principal: JwtPrincipal): string {
    return jwt.sign(principal, Environment.getInstance().vars.ACCESS_TOKEN_SECRET, {
      expiresIn: "15m",
    });
  }

  public generateRefreshToken(username: string): string {
    return jwt.sign({ username }, Environment.getInstance().vars.REFRESH_TOKEN_SECRET, {
      expiresIn: "7d",
    });
  }

  public clearJwtCookie(res: Response): void {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
  }

  public setSecureCookie(res: Response, token: string, days: number = 7): void {
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: days * 24 * 60 * 60 * 1000, // 7 days
    });
  }
}
