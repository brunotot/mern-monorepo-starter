import type { AuthorizationRepository } from "../repository/UserRepository";
import type { UserConverter } from "@org/app-node-express/app/infrastructure/converters/UserConverter";
import type { TypedPaginationResponse, UserDto, UserForm } from "@org/lib-api-client";
import type { TODO } from "@org/lib-commons";

import { autowired, inject } from "@org/app-node-express/lib/ioc";
import { RestError } from "@org/lib-api-client";

@inject("UserService")
export class UserService {
  @autowired() private authorizationRepository: AuthorizationRepository;
  @autowired() private userConverter: UserConverter;

  async findAll(): Promise<UserDto[]> {
    const users = await this.authorizationRepository.findAllUsers();
    return await this.userConverter.domainToDtoList(users);
  }

  async findAllPaginated(paginationOptions: TODO): Promise<TypedPaginationResponse<UserDto>> {
    // eslint-disable-next-line no-console
    console.log(paginationOptions);
    return null as TODO;
  }

  async findOneByUsername(username: string): Promise<UserDto> {
    const user = await this.authorizationRepository.findUserByUsername(username);
    if (user === null) throw new RestError(404, "User not found");
    return await this.userConverter.domainToDto(user);
  }

  async getFormByUsername(username: string): Promise<UserForm> {
    const user = await this.authorizationRepository.findUserByUsername(username);
    if (user === null) throw new RestError(404, "User not found");
    return await this.userConverter.domainToForm(user);
  }

  async createUser(model: UserForm): Promise<UserDto> {
    const user = await this.userConverter.formToDomain(model);
    const domain = await this.authorizationRepository.createUser(user);
    const userId = (await this.authorizationRepository.findUserByUsername(domain.username))!.id!;
    await this.authorizationRepository.updateUserRoles(userId, model.roles);
    await this.authorizationRepository.updateUserPassword(userId, model.password!);
    return await this.findOneByUsername(domain.username);
  }

  async updateUser(model: UserForm): Promise<UserDto> {
    const user = await this.userConverter.formToDomain(model);
    const domain = await this.authorizationRepository.updateUser(user);
    const userId = (await this.authorizationRepository.findUserByUsername(domain.username))!.id!;
    await this.authorizationRepository.updateUserRoles(userId, model.roles);
    await this.authorizationRepository.updateUserPassword(userId, model.password!);
    return await this.findOneByUsername(domain.username);
  }

  async deleteUser(id: string): Promise<void> {
    await this.authorizationRepository.deleteUser(id);
  }
}
