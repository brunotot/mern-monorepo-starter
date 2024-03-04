import { Entity } from "../../config";
import { User } from "../../form/UserForm";

export interface UserRepository {
  findAll: () => Promise<Entity<User>[]>;
  create: (user: User) => Promise<Entity<User>>;
}
