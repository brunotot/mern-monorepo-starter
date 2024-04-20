import { Entity } from "../../config";
import { MongoUser, User } from "../../domain";

export interface UserRepository {
  findOne: (filters: Parameters<typeof MongoUser.findOne>[0]) => Promise<Entity<User> | null>;
  findAll: () => Promise<Entity<User>[]>;
  create: (user: User) => Promise<Entity<User>>;
  save: (user: User) => Promise<Entity<User>>;
}
