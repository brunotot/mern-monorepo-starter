import type { User, UserPageableResponseDto } from "@internal";

export interface UserRepository {
  pagination: () => Promise<UserPageableResponseDto>;
  findOne: (filters: Partial<User>) => Promise<User | null>;
  findAll: () => Promise<User[]>;
  insertOne: (user: Omit<User, "_id">) => Promise<User>;
  updateOne: (user: User) => Promise<User>;
}
