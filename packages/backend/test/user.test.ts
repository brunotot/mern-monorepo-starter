/// <reference types="@types/jest" />
import supertest from "supertest";

describe("user", () => {
  describe("get user route", () => {
    describe("given the user does not exist", () => {
      it("should return a 404", async () => {
        const nonExistingUsername = "usernameWhichShouldFail";
        await supertest(globalThis.app).get(`/users/${nonExistingUsername}`).expect(404);
      });
    });

    describe("given the user does exist", () => {
      it("should return a 200 status and the user", async () => {
        const existingUsername = "brunotot";
        await supertest(globalThis.app).get(`/users/${existingUsername}`).expect(200);
      });
    });
  });
});
