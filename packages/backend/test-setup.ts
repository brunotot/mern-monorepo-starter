//import { MongoMemoryServer } from "mongodb-memory-server";

// This will hold the instance of MongoMemoryServer
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let mongoServer: any = null;

export async function setup() {
  //mongoServer = await MongoMemoryServer.create();
  //const uri = mongoServer.getUri();
  //await mongoose.connect(uri);
}

export async function teardown() {
  //if (mongoose.connection.readyState !== 0) {
  //  await mongoose.disconnect();
  //}
  //if (mongoServer) {
  //  await mongoServer.stop();
  //}
}

export default { setup, teardown };
