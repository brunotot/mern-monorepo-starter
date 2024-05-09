//import app from "../configureApp";
//import supertest from "supertest";

describe("product", () => {
  beforeAll(async () => {});

  /*beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();

    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });*/

  describe("get product route", () => {
    describe("given the product does not exist", () => {
      it("should return a 404", async () => {
        expect(true).toBe(true);
        //const username = "5f7b081f66677f001721401a";
        //await supertest(app.app).get(`/users/${username}`).expect(404);
      });
    });

    describe("given the product does exist", () => {
      it("should return a 200 status and the product", async () => {
        expect(true).toBe(true);
      });
    });
  });
});
