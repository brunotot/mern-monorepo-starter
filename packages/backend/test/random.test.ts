/// <reference types="@types/jest" />
import supertest from "supertest";
import { getComponent } from "./setup/registrySetup";
import { UserService } from "../dist/infrastructure/service/UserService";

describe("user", () => {
  describe("get user route", () => {
    describe("given the user does not exist", () => {
      it("should return a 404", async () => {
        const nonExistingUsername = "usernameWhichShouldFail";
        const userService = getComponent(UserService);
        const users = await userService.findAll();
        console.log("From random.test.ts");
        console.log(JSON.stringify(users, null, 2));

        //console.log(globalThis.expressApp);
        await supertest(globalThis.expressApp).get(`/users/${nonExistingUsername}`).expect(404);

        await userService.deleteByUsername("brunotot");

        console.log("After delete");
        const usersAfterDelete = await userService.findAll();
        console.log(JSON.stringify(usersAfterDelete, null, 2));
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
