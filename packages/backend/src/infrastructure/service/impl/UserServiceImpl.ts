import type { TODO } from "@org/shared";

import type { User, UserPageableResponseDto, UserRepository, UserService } from "@internal";
import { Autowired, Injectable } from "@internal";

@Injectable()
export class UserServiceImpl implements UserService {
  @Autowired() userRepository: UserRepository;

  async pagination(): Promise<UserPageableResponseDto> {
    return this.userRepository.pagination();
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll() as TODO;
  }

  async create(user: User): Promise<User> {
    return this.userRepository.insertOne(user) as TODO;
  }
}
