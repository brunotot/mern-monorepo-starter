import { type Response } from "express";
import type { TODO } from "@org/shared";
import bcrypt from "bcrypt";
import type { VerifyErrors } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import { Environment } from "@config";
import { withValidatedBody, type UserRepository } from "@infrastructure";
import { Autowired, Contract, Injectable } from "@decorators";
import { LoginForm, type Input, type Output } from "@models";

@Injectable()
export class AuthController {
  @Autowired() userRepository: UserRepository;

  @Contract("Auth.login", withValidatedBody(LoginForm))
  async login(data: Input<"Auth.login">): Output<"Auth.login"> {
    const {
      req: { cookies },
      res,
      body: { username, password },
    } = data;

    //  Validation error. Needs refactor via decorators
    if (!username || !password) {
      return {
        status: 400,
        body: { message: "Username and password are required." },
      };
    }

    const foundUser = await this.userRepository.findOne({ username });

    // Unauthorized
    if (!foundUser) {
      return {
        status: 401,
        body: { message: "Unauthorized" },
      };
    }

    // Evaluate password
    const match = await bcrypt.compare(password, foundUser.password);

    // Password invalid
    if (!match) {
      return {
        status: 401,
        body: { message: "Unauthorized" },
      };
    }

    const roles = Object.values(foundUser.roles).filter(Boolean);
    // create JWTs
    const accessToken = this.generateAccessToken(username, roles);
    const newRefreshToken = this.generateRefreshToken(foundUser.username);

    // Changed to let keyword
    let newRefreshTokenArray = !cookies?.jwt
      ? foundUser.refreshToken
      : foundUser.refreshToken.filter(rt => rt !== cookies.jwt);

    if (cookies?.jwt) {
      /* 
                Scenario added here: 
                    1) User logs in but never uses RT and does not logout 
                    2) RT is stolen
                    3) If 1 & 2, reuse detection is needed to clear all RTs when user logs in
                */
      const refreshToken = cookies.jwt;
      const foundToken = await this.userRepository.findOne({ refreshToken });

      // Detected refresh token reuse!
      if (!foundToken) {
        /** Clear out **all** previous refresh tokens */
        newRefreshTokenArray = [];
      }

      this.clearJwtCookie(res);
    }

    // Saving refreshToken with current user
    foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
    await this.userRepository.updateOne(foundUser);

    // Creates Secure Cookie with refresh token
    res.cookie("jwt", newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });

    // Send authorization roles and access token to user

    return {
      status: 200,
      body: { accessToken },
    };
  }

  @Contract("Auth.logout")
  async logout(data: Input<"Auth.logout">): Output<"Auth.logout"> {
    const { req, res } = data;

    // On client, also delete the accessToken

    const cookies = req.cookies;
    if (!cookies?.jwt)
      return {
        status: 204,
        body: undefined,
      };
    const refreshToken = cookies.jwt;

    // Is refreshToken in db?
    const foundUser = await this.userRepository.findOne({ refreshToken });
    if (!foundUser) {
      this.clearJwtCookie(res);
      return {
        status: 204,
        body: undefined,
      };
    }

    // Delete refreshToken in db
    foundUser.refreshToken = foundUser.refreshToken.filter(rt => rt !== refreshToken);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    await this.userRepository.updateOne(foundUser);

    this.clearJwtCookie(res);
    return {
      status: 204,
      body: undefined,
    };
  }

  @Contract("Auth.refresh")
  async refresh(data: Input<"Auth.refresh">): Output<"Auth.refresh"> {
    const { req, res } = data;
    const cookies = req.cookies;

    if (!cookies?.jwt) {
      return { status: 403, body: undefined };
    }

    const refreshToken = cookies.jwt;
    this.clearJwtCookie(res);

    let decoded: TODO;
    try {
      decoded = await this.verifyToken(
        refreshToken,
        Environment.getInstance().vars.REFRESH_TOKEN_SECRET,
      );
    } catch (error) {
      return { status: 403, body: undefined }; // Handle token verification errors uniformly
    }

    const foundUser = await this.userRepository.findOne({ refreshToken });
    if (!foundUser || foundUser.username !== decoded.username) {
      return { status: 403, body: undefined }; // User not found, or username does not match token
    }

    // Update refresh tokens: remove the used one and possibly add new
    const newRefreshTokenArray = foundUser.refreshToken.filter(rt => rt !== refreshToken);
    foundUser.refreshToken = [...newRefreshTokenArray];
    await this.userRepository.updateOne(foundUser);

    // Generate new tokens
    const accessToken = this.generateAccessToken(decoded.username, foundUser.roles);
    const newRefreshToken = this.generateRefreshToken(decoded.username);

    // Persist the new refresh token with current user
    foundUser.refreshToken.push(newRefreshToken);
    await this.userRepository.updateOne(foundUser);

    // Set new secure cookie with the new refresh token
    this.setSecureCookie(res, newRefreshToken);

    return {
      status: 200,
      body: { accessToken },
    };
  }

  private async verifyToken(token: string, secret: string): Promise<TODO> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, secret, (err: VerifyErrors | null, decoded: TODO) => {
        if (err || !decoded) {
          reject(new Error("Token verification failed"));
        } else {
          resolve(decoded);
        }
      });
    });
  }

  private generateAccessToken(username: string, roles: string[]): string {
    return jwt.sign(
      { UserInfo: { username, roles } },
      Environment.getInstance().vars.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" },
    );
  }

  private generateRefreshToken(username: string): string {
    return jwt.sign({ username }, Environment.getInstance().vars.REFRESH_TOKEN_SECRET, {
      expiresIn: "7d",
    });
  }

  private clearJwtCookie(res: Response): void {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
  }

  private setSecureCookie(res: Response, token: string): void {
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
  }
}
