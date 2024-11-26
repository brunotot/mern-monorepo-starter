import { MongoMemoryReplSet } from "mongodb-memory-server";

export const REPLICA_SET_COUNT = 3;

export type DatabaseConnectionUrlFactory = () => Promise<{
  server: MongoMemoryReplSet;
  connectionUrl: string;
}>;

export const mongoConnectionUrlFactory: DatabaseConnectionUrlFactory = async () => {
  const server = await MongoMemoryReplSet.create({ replSet: { count: REPLICA_SET_COUNT } });
  const mongoUri = server.getUri();
  const mongoUrl = mongoUri.replace("mongodb://", "");
  const [host, port] = mongoUrl.split(":");
  return { server, connectionUrl: `mongodb://${host}:${port}` };
};
