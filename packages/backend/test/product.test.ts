import supertest from "supertest";

describe("product", () => {
  describe("get product route", () => {
    describe("given the product does not exist", () => {
      it("should return a 404", async () => {
        expect(true).toBe(true);
        const username = "brunotota";
        await supertest(globalThis.MockApp.app).get(`/users/${username}`).expect(404);
      });
    });

    describe("given the product does exist", () => {
      it("should return a 200 status and the product", async () => {
        expect(true).toBe(true);
      });
    });
  });
});
