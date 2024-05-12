import bcrypt from "bcrypt";
import { JwtManager, type TokenData } from "@org/backend/config";
import { type UserRepository } from "@org/backend/infrastructure/repository/UserRepository";
import { withJwt } from "@org/backend/infrastructure/middleware/locals/withJwt";
import { withValidatedBody } from "@org/backend/infrastructure/middleware/locals/withValidatedBody";
import { Autowired, Contract, Injectable } from "@org/backend/decorators";
import type { RouteInput, RouteOutput } from "@org/backend/types";
import { LoginForm, ErrorResponse } from "@org/shared";

@Injectable("authController")
export class AuthController {
  @Autowired() userRepository: UserRepository;

  @Contract("Auth.login", withValidatedBody(LoginForm))
  async login({
    req,
    res,
    body: { username, password },
  }: RouteInput<"Auth.login">): RouteOutput<"Auth.login"> {
    const cookies = req.cookies;
    const jwtManager = JwtManager.getBy(req);
    const foundUser = await this.userRepository.findOneByUsername(username);

    // Unauthorized
    if (!foundUser) {
      return {
        status: 401,
        body: new ErrorResponse(req.originalUrl, 400, "Unauthorized").content,
      };
    }

    // Evaluate password
    const match = await bcrypt.compare(password, foundUser.password);

    // Password invalid
    if (!match) {
      return {
        status: 401,
        body: new ErrorResponse(req.originalUrl, 400, "Unauthorized").content,
      };
    }

    const roles = Object.values(foundUser.roles).filter(Boolean);
    // create JWTs
    const accessToken = jwtManager.generateAccessToken({ username, roles });
    const newRefreshToken = jwtManager.generateRefreshToken(foundUser.username);

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
      const foundToken = await this.userRepository.findOneByRefreshTokens(refreshToken);

      // Detected refresh token reuse!
      if (!foundToken) {
        /** Clear out **all** previous refresh tokens */
        newRefreshTokenArray = [];
      }

      jwtManager.clearJwtCookie(res);
    }

    // Saving refreshToken with current user
    foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
    await this.userRepository.updateOne(foundUser);

    // Creates Secure Cookie with refresh token
    jwtManager.setSecureCookie(res, newRefreshToken, 1);

    // Send authorization roles and access token to user

    return {
      status: 200,
      body: { accessToken },
    };
  }

  @Contract("Auth.logout")
  async logout(data: RouteInput<"Auth.logout">): RouteOutput<"Auth.logout"> {
    const { req, res } = data;
    const jwtManager = JwtManager.getBy(req);

    // On client, also delete the accessToken

    const cookies = req.cookies;
    if (!cookies?.jwt)
      return {
        status: 204,
        body: undefined,
      };
    const refreshToken = cookies.jwt;

    // Is refreshToken in db?
    const foundUser = await this.userRepository.findOneByRefreshTokens(refreshToken);
    if (!foundUser) {
      jwtManager.clearJwtCookie(res);
      return {
        status: 204,
        body: undefined,
      };
    }

    // Delete refreshToken in db
    foundUser.refreshToken = foundUser.refreshToken.filter(rt => rt !== refreshToken);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    await this.userRepository.updateOne(foundUser);

    jwtManager.clearJwtCookie(res);
    return {
      status: 204,
      body: undefined,
    };
  }

  @Contract("Auth.refresh", withJwt("refresh"))
  async refresh(data: RouteInput<"Auth.refresh">): RouteOutput<"Auth.refresh"> {
    const { req, res } = data;
    const jwtManager = JwtManager.getBy(req);
    const { token: refreshToken, data: decoded }: TokenData = res.locals.tokenData;
    jwtManager.clearJwtCookie(res);
    const foundUser = await this.userRepository.findOneByRefreshTokens([refreshToken]);
    if (!foundUser || foundUser.username !== decoded.username) {
      return { status: 403, body: new ErrorResponse(req.originalUrl, 403, "Forbidden").content }; // User not found, or username does not match token
    }

    // Update refresh tokens: remove the used one and possibly add new
    const newRefreshTokenArray = foundUser.refreshToken.filter(rt => rt !== refreshToken);
    foundUser.refreshToken = [...newRefreshTokenArray];
    await this.userRepository.updateOne(foundUser);

    // Generate new tokens
    const accessToken = jwtManager.generateAccessToken({
      username: decoded.username,
      roles: foundUser.roles,
    });
    const newRefreshToken = jwtManager.generateRefreshToken(decoded.username);

    // Persist the new refresh token with current user
    foundUser.refreshToken.push(newRefreshToken);
    await this.userRepository.updateOne(foundUser);

    // Set new secure cookie with the new refresh token
    jwtManager.setSecureCookie(res, newRefreshToken, 7);

    return {
      status: 200,
      body: { accessToken },
    };
  }
}
