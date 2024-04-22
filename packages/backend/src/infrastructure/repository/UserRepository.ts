import type { User } from "@internal";

export interface UserRepository {
  findOne: (filters: Partial<User>) => Promise<User | null>;
  findAll: () => Promise<User[]>;
  insertOne: (user: Omit<User, "_id">) => Promise<User>;
  updateOne: (user: User) => Promise<User>;
}
