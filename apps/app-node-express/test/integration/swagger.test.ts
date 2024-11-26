import { request } from "../config/utils";

describe("swagger", () => {
  describe("get swagger route", () => {
    describe("given the Swagger API docs are available", () => {
      it("should return the Swagger UI with correct HTML", async () => {
        const response = await request().get(`/api-docs`).redirects(1);

        expect(response.status).toBe(200);
        expect(response.ok).toBe(true);
        expect(response.text).toContain('<div id="swagger-ui">');
      });
    });
  });
});
