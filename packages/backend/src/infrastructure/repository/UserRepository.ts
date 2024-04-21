import type { Entity, User, userDomain } from "@internal";

export interface UserRepository {
  findOne: (filters: Parameters<typeof userDomain.db.findOne>[0]) => Promise<Entity<User> | null>;
  findAll: () => Promise<Entity<User>[]>;
  create: (user: User) => Promise<Entity<User>>;
  save: (user: User) => Promise<Entity<User>>;
}
