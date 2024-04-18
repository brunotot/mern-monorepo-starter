import { TODO } from "@org/shared";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import HttpStatus from "http-status";
import jwt, { VerifyErrors } from "jsonwebtoken";
import z from "zod";
import { $BackendAppConfig } from "../config/BackendAppConfig";
import { Controller, PostMapping, Use } from "../decorators";
import UserDomain from "../domain/UserDomain";
import { withValidatedBody } from "../middleware";
import { buildSwaggerBody } from "../swagger/SwaggerRequestBody";

const LoginForm = z.object({
  username: z.string(),
  password: z.string(),
});
type LoginForm = z.infer<typeof LoginForm>;

const LoginResponse = z.object({
  accessToken: z.string(),
});

type LoginResponse = z.infer<typeof LoginResponse>;

@Controller("/auth", {
  description: "Authentication",
})
export class AuthController {
  @Use(withValidatedBody(LoginForm))
  @PostMapping("/login", {
    description: "Login user",
    summary: "Login user",
    requestBody: buildSwaggerBody(LoginForm),
    responses: {
      [HttpStatus.OK]: {
        description: "Access token",
        content: buildSwaggerBody(LoginResponse).content,
      },
    },
  })
  async login(req: Request, res: Response<TODO>) {
    const cookies = req.cookies;

    const { username, password } = req.body;
    if (!username || !password) {
      res.sendError(422, "Username and password are required.");
    }

    const foundUser = await UserDomain.findOne({ username: username }).exec();
    if (!foundUser) {
      res.sendError(401);
    } //Unauthorized

    // evaluate password
    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {
      const roles = Object.values(foundUser.roles).filter(Boolean);
      // create JWTs
      const accessToken = jwt.sign(
        {
          UserInfo: {
            username: foundUser.username,
            roles: roles,
          },
        },
        $BackendAppConfig.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" },
      );
      const newRefreshToken = jwt.sign(
        { username: foundUser.username },
        $BackendAppConfig.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "7d" },
      );

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
        const foundToken = await UserDomain.findOne({ refreshToken }).exec();

        // Detected refresh token reuse!
        if (!foundToken) {
          // clear out ALL previous refresh tokens
          newRefreshTokenArray = [];
        }

        res.clearCookie("jwt", {
          httpOnly: true,
          sameSite: "none",
          secure: true,
        });
      }

      // Saving refreshToken with current user
      foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
      await foundUser.save();

      // Creates Secure Cookie with refresh token
      res.cookie("jwt", newRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000,
      });

      // Send authorization roles and access token to user
      return res.json({ accessToken: accessToken });
    } else {
      res.sendError(401);
    }
  }

  @PostMapping("/logout", {
    description: "Logout user",
    summary: "Logout user",
    responses: {
      [HttpStatus.NO_CONTENT]: {
        description: "No content",
      },
    },
  })
  async logout(req: Request, res: Response) {
    // On client, also delete the accessToken

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); //No content
    const refreshToken = cookies.jwt;

    // Is refreshToken in db?
    const foundUser = await UserDomain.findOne({ refreshToken }).exec();
    if (!foundUser) {
      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
      return res.sendStatus(204);
    }

    // Delete refreshToken in db
    foundUser.refreshToken = foundUser.refreshToken.filter(rt => rt !== refreshToken);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const result = await foundUser.save();
    // console.log(result);

    res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
    res.sendStatus(204);
  }

  @PostMapping("/refresh", {
    description: "Refresh access token",
    summary: "Refresh access token",
    responses: {
      [HttpStatus.OK]: {
        description: "New access",
      },
      [HttpStatus.FORBIDDEN]: {
        description: "Forbidden",
      },
      [HttpStatus.UNAUTHORIZED]: {
        description: "Unauthorized",
      },
    },
  })
  async refresh(req: Request, res: Response) {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;
    res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });

    const foundUser = await UserDomain.findOne({ refreshToken }).exec();

    // Detected refresh token reuse!
    if (!foundUser) {
      jwt.verify(
        refreshToken,
        $BackendAppConfig.env.REFRESH_TOKEN_SECRET,
        async (err: VerifyErrors | null, decoded: TODO) => {
          if (err) return res.sendStatus(403); //Forbidden
          // Delete refresh tokens of hacked user
          const hackedUser = await UserDomain.findOne({
            username: decoded.username,
          }).exec();
          hackedUser!.refreshToken;
          hackedUser!.refreshToken = [];
          await hackedUser!.save();
        },
      );
      return res.sendStatus(403); //Forbidden
    }

    const newRefreshTokenArray = foundUser.refreshToken.filter(rt => rt !== refreshToken);

    // evaluate jwt
    jwt.verify(
      refreshToken,
      $BackendAppConfig.env.REFRESH_TOKEN_SECRET,
      async (err: VerifyErrors | null, decoded: TODO) => {
        if (err) {
          // expired refresh token
          foundUser.refreshToken = [...newRefreshTokenArray];
          await foundUser.save();
        }
        if (err || foundUser.username !== decoded.username) return res.sendStatus(403);

        // Refresh token was still valid
        const roles = Object.values(foundUser.roles);
        const accessToken = jwt.sign(
          {
            UserInfo: {
              username: decoded.username,
              roles: roles,
            },
          },
          $BackendAppConfig.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "15m" },
        );

        const newRefreshToken = jwt.sign(
          { username: foundUser.username },
          $BackendAppConfig.env.REFRESH_TOKEN_SECRET,
          { expiresIn: "7d" },
        );
        // Saving refreshToken with current user
        foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
        await foundUser.save();

        // Creates Secure Cookie with refresh token
        res.cookie("jwt", newRefreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          maxAge: 24 * 60 * 60 * 1000,
        });

        res.json({ accessToken });
      },
    );
  }
}
