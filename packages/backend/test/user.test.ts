/// <reference types="@types/jest" />
import supertest from "supertest";
import { UserService } from "../dist/infrastructure/service/UserService";
import { getComponent } from "./setup/registrySetup";

describe("user", () => {
  describe("get user route", () => {
    describe("given the user does not exist", () => {
      it("should return a 404", async () => {
        const userService = getComponent(UserService);
        const users = await userService.findAll();
        console.log("From user.test.ts");
        console.log(JSON.stringify(users, null, 2));
        const nonExistingUsername = "usernameWhichShouldFail";
        //console.log(globalThis.expressApp);
        await supertest(globalThis.expressApp).get(`/users/${nonExistingUsername}`).expect(404);
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
