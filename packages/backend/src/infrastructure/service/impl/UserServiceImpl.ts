import { TODO } from "@org/shared";
import { Autowired } from "../../../decorators/ioc/@Autowired";
import { Injectable } from "../../../decorators/ioc/@Injectable";
import { User } from "../../../domain";
import { UserRepository } from "../../repository";
import { UserService } from "../UserService";

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
