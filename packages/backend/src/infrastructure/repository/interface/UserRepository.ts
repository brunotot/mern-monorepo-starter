import { type User } from "@org/shared";
import { type PaginableRepository } from "@org/backend/infrastructure/repository/interface/PaginableRepository";

export interface UserRepository extends PaginableRepository<User> {
  findOne: (filters: Partial<User>) => Promise<User | null>;
  findAll: () => Promise<User[]>;
  insertOne: (user: Omit<User, "_id">) => Promise<User>;
  updateOne: (user: User) => Promise<User>;
}
