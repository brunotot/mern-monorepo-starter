import { MongoMemoryServer } from "mongodb-memory-server";
// simport type { GlobalSetupContext } from "vitest/node";

let teardown = false;

/*declare module "vitest" {
  export interface ProvidedContext {
    mongoUri: string;
  }
}*/

export default async (/*{ provide }: GlobalSetupContext*/) => {
  const server = await MongoMemoryServer.create();
  const mongoUri = `${server.getUri()}?retryWrites=true`;
  //provide("mongoUri", mongoUri);
  console.log(mongoUri);
  return async () => {
    if (teardown) throw new Error("teardown called twice");
    teardown = true;
    await server.stop({ doCleanup: true, force: true });
  };
};
