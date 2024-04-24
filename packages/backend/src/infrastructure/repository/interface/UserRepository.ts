import { type User } from "@domain";
import { type PaginableRepository } from "@infrastructure/repository/interface/PaginableRepository";

export interface UserRepository extends PaginableRepository<User> {
  findOne: (filters: Partial<User>) => Promise<User | null>;
  findAll: () => Promise<User[]>;
  insertOne: (user: Omit<User, "_id">) => Promise<User>;
  updateOne: (user: User) => Promise<User>;
}
