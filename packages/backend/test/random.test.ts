/// <reference types="@types/jest" />
import supertest from "supertest";
import { type UserService } from "../dist/infrastructure/service/UserService";
import { iocRegistry } from "../dist/setup/registry.setup";

describe("user", () => {
  describe("get user route", () => {
    describe("given the user does not exist", () => {
      it("should return a 404", async () => {
        const nonExistingUsername = "usernameWhichShouldFail";
        const userService = iocRegistry.inject<UserService>("UserService");
        await supertest(globalThis.expressApp)
          .get(`/users/findOneByUsername?username=${nonExistingUsername}`)
          .expect(404);
        await userService.deleteByUsername("admin");
      });
    });

    describe("given the user does exist", () => {
      it("should return a 200 status and the user", async () => {
        const existingUsername = "admin";
        await supertest(globalThis.expressApp)
          .get(`/users/findOneByUsername?username=${existingUsername}`)
          .expect(200);
      });
    });
  });
});
