import type { User, UserPageableResponseDto } from "@internal";

export interface UserService {
  pagination: () => Promise<UserPageableResponseDto>;
  findAll: () => Promise<User[]>;
  create: (user: User) => Promise<User>;
}
