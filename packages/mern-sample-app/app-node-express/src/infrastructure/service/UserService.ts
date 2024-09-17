import { autowired } from "@org/app-node-express/decorators/autowired";
import { inject } from "@org/app-node-express/decorators/inject";
import { type AuthorizationRepository } from "@org/app-node-express/interface/AuthorizationRepository";
import { RestError, type User } from "@org/lib-api-client";

@inject()
export class UserService {
  @autowired() private authorizationRepository: AuthorizationRepository;

  async findAll(): Promise<User[]> {
    return await this.authorizationRepository.findAllUsers();
  }

  async findOneByUsername(username: string): Promise<User> {
    const user = await this.authorizationRepository.findUserByUsername(username);
    if (user === null) throw new RestError(404, "User not found");
    return user;
  }
}
