import { User } from "../../form/UserForm";

export interface UserService {
  findAll: () => Promise<User[]>;
  create: (user: User) => Promise<User>;
}
