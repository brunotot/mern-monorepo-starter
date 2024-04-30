import type { TODO } from "@org/shared";
import bcrypt from "bcrypt";
import type { Request, Response } from "express";
import type { VerifyErrors } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import { Environment } from "@config";
import { type UserRepository, withValidatedBody } from "@infrastructure";
import { Autowired, Controller, Use, PostMapping } from "@decorators";
import { LoginForm } from "@models";
import { AuthDocs } from "@web/swagger/AuthDocs";

@Controller("/auth", { description: "Authentication" })
export class AuthController {
  @Autowired() userRepository: UserRepository;

  @Use(withValidatedBody(LoginForm))
  @PostMapping("/login", AuthDocs.login)
  async login(req: Request<unknown, unknown, LoginForm>, res: Response<TODO>) {
    const cookies = req.cookies;

    const { username, password } = req.body;
    if (!username || !password) {
      res.sendError(400, "Username and password are required.");
    }

    const foundUser = await this.userRepository.findOne({ username: username });
    if (!foundUser) {
      //res.sendResponse(404, "User not found", null);
      //res.sendResponse(200, "Access token")
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
        Environment.getInstance().vars.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" },
      );
      const newRefreshToken = jwt.sign(
        { username: foundUser.username },
        Environment.getInstance().vars.REFRESH_TOKEN_SECRET,
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
        const foundToken = await this.userRepository.findOne({ refreshToken });

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
      await this.userRepository.updateOne(foundUser);

      // Creates Secure Cookie with refresh token
      res.cookie("jwt", newRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000,
      });

      // Send authorization roles and access token to user
      return res.json({ accessToken: accessToken });
      //res.sendResponse(200, "LoginResponse", impl)
    } else {
      res.sendError(401);
    }
  }

  @PostMapping("/logout", AuthDocs.logout)
  async logout(req: Request, res: Response) {
    // On client, also delete the accessToken

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); //No content
    const refreshToken = cookies.jwt;

    // Is refreshToken in db?
    const foundUser = await this.userRepository.findOne({ refreshToken });
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
    await this.userRepository.updateOne(foundUser);

    res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
    res.sendStatus(204);
  }

  @PostMapping("/refresh", AuthDocs.refresh)
  async refresh(req: Request, res: Response) {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendError(401);
    const refreshToken = cookies.jwt;
    res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });

    const foundUser = await this.userRepository.findOne({ refreshToken });

    // Detected refresh token reuse!
    if (!foundUser) {
      jwt.verify(
        refreshToken,
        Environment.getInstance().vars.REFRESH_TOKEN_SECRET,
        async (err: VerifyErrors | null, decoded: TODO) => {
          if (err) return res.sendError(403); //Forbidden
          // Delete refresh tokens of hacked user
          const filters = { username: decoded.username };
          const hackedUser = await this.userRepository.findOne(filters);
          hackedUser!.refreshToken = [];
          await this.userRepository.updateOne(hackedUser!);
        },
      );
      return res.sendError(403); //Forbidden
    }

    const newRefreshTokenArray = foundUser.refreshToken.filter(rt => rt !== refreshToken);

    // evaluate jwt
    jwt.verify(
      refreshToken,
      Environment.getInstance().vars.REFRESH_TOKEN_SECRET,
      async (err: VerifyErrors | null, decoded: TODO) => {
        if (err) {
          // expired refresh token
          foundUser.refreshToken = [...newRefreshTokenArray];
          await this.userRepository.updateOne(foundUser);
        }
        if (err || foundUser.username !== decoded.username) return res.sendError(403);

        // Refresh token was still valid
        const roles = Object.values(foundUser.roles);
        const accessToken = jwt.sign(
          {
            UserInfo: {
              username: decoded.username,
              roles: roles,
            },
          },
          Environment.getInstance().vars.ACCESS_TOKEN_SECRET,
          { expiresIn: "15m" },
        );

        const newRefreshToken = jwt.sign(
          { username: foundUser.username },
          Environment.getInstance().vars.REFRESH_TOKEN_SECRET,
          { expiresIn: "7d" },
        );
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

        res.json({ accessToken });
      },
    );
  }
}
