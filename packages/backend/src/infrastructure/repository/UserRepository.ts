import { Entity } from "../../config";
import { User } from "../../domain";

export interface UserRepository {
  findAll: () => Promise<Entity<User>[]>;
  create: (user: User) => Promise<Entity<User>>;
}
