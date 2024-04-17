import { User } from "../../domain";

export interface UserService {
  findAll: () => Promise<User[]>;
  create: (user: User) => Promise<User>;
}
