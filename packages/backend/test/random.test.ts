/// <reference types="@types/jest" />
import supertest from "supertest";
import { type UserService } from "../dist/infrastructure/service/UserService";
import { ServiceRegistry } from "../dist/config/singletons/ServiceRegistry";

describe("user", () => {
  describe("get user route", () => {
    describe("given the user does not exist", () => {
      it("should return a 404", async () => {
        const nonExistingUsername = "usernameWhichShouldFail";
        const userService = ServiceRegistry.getInstance().inject<UserService>("UserService");
        await supertest(globalThis.expressApp).get(`/users/${nonExistingUsername}`).expect(404);
        await userService.deleteByUsername("brunotot");
      });
    });

    describe("given the user does exist", () => {
      it("should return a 200 status and the user", async () => {
        const existingUsername = "brunotot";
        await supertest(globalThis.expressApp).get(`/users/${existingUsername}`).expect(200);
      });
    });
  });
});
