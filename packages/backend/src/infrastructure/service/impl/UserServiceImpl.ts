import type { TODO } from "@org/shared";

import type { User, UserRepository, UserService } from "@internal";
import { Autowired, Injectable } from "@internal";

@Injectable()
export class UserServiceImpl implements UserService {
  @Autowired() userRepository: UserRepository;

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll() as TODO;
  }

  async create(user: User): Promise<User> {
    return this.userRepository.create(user) as TODO;
  }
}
