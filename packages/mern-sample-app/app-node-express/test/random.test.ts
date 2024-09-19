/// <reference types="@types/jest" />

import supertest from "supertest";

import { app } from "./setup/utils";

describe("user", () => {
  describe("get user route", () => {
    describe("given the user does not exist", () => {
      it("should return a 404", async () => {
        const nonExistingUsername = "usernameWhichShouldFail";
        await supertest(app())
          .get(`/users/findOneByUsername?username=${nonExistingUsername}`)
          .expect(404);
      });
    });

    describe("given the user does exist", () => {
      it("should return a 200 status and the user", async () => {
        const existingUsername = "admin";
        await supertest(app())
          .get(`/users/findOneByUsername?username=${existingUsername}`)
          .expect(200);
      });
    });
  });
});
