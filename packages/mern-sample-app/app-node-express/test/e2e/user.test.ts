import { request } from "../config/setup/utils";

describe("user", () => {
  describe("get user route", () => {
    describe("given the user does not exist", () => {
      it("should return a 404", async () => {
        const nonExistingUsername = "usernameWhichShouldFail";
        const response = await request().get(
          `/users/findOneByUsername?username=${nonExistingUsername}`,
        );
        expect(response.status).toBe(404);
      });
    });

    describe("given the user does exist", () => {
      it("should return a 200 status and the user", async () => {
        const existingUsername = "admin";
        const response = await request().get(
          `/users/findOneByUsername?username=${existingUsername}`,
        );
        expect(response.status).toBe(200);
      });
    });
  });
});
