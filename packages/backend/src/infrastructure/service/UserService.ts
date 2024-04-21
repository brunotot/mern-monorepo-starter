import type { User } from "@internal";

export interface UserService {
  findAll: () => Promise<User[]>;
  create: (user: User) => Promise<User>;
}
