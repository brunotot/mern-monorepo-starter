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
    const { req, res } = data;
    const cookies = req.cookies;

    const { username, password } = req.body;
    if (!username || !password) {
      res.sendError(400, "Username and password are required.");
    }

    const foundUser = await this.userRepository.findOne({ username: username });
    if (!foundUser) {
      return {
        status: 401,
        body: { message: "Unauthorized" },
      };
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

      return {
        status: 200,
        body: { accessToken },
      };
    } else {
      return {
        status: 401,
        body: { message: "Unauthorized" },
      };
    }
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
      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
      return {
        status: 204,
        body: undefined,
      };
    }

    // Delete refreshToken in db
    foundUser.refreshToken = foundUser.refreshToken.filter(rt => rt !== refreshToken);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    await this.userRepository.updateOne(foundUser);

    res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
    return {
      status: 204,
      body: undefined,
    };
  }

  @Contract("Auth.refresh")
  async refresh(data: Input<"Auth.refresh">): Output<"Auth.refresh"> {
    const { req, res } = data;
    const cookies = req.cookies;
    if (!cookies?.jwt)
      return {
        status: 403,
        body: undefined,
      };
    const refreshToken = cookies.jwt;
    res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });

    const foundUser = await this.userRepository.findOne({ refreshToken });

    // Detected refresh token reuse!
    if (!foundUser) {
      jwt.verify(
        refreshToken,
        Environment.getInstance().vars.REFRESH_TOKEN_SECRET,
        async (err: VerifyErrors | null, decoded: TODO) => {
          if (err) {
            res.send({
              status: 403,
              body: undefined,
            });
          }
          // Delete refresh tokens of hacked user
          const filters = { username: decoded.username };
          const hackedUser = await this.userRepository.findOne(filters);
          hackedUser!.refreshToken = [];
          await this.userRepository.updateOne(hackedUser!);
        },
      );

      return {
        status: 403,
        body: undefined,
      };
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

        return {
          status: 200,
          body: { accessToken },
        };
      },
    );

    return {
      status: 200,
      body: { todo: "TODO" } as TODO,
    };
  }
}
