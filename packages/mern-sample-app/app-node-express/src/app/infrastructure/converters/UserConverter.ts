import type { AuthorizationRepository } from "@org/app-node-express/app/infrastructure/repository/UserRepository";
import type { Role, User, UserDto, UserForm } from "@org/lib-api-client";

import { Converter } from "@org/app-node-express/app/infrastructure/converters/Converter";
import { autowired, inject } from "@org/app-node-express/lib";
import { ROLE_LIST } from "@org/lib-api-client";

@inject("UserConverter")
export class UserConverter extends Converter<User, UserForm, UserDto> {
  @autowired() private authorizationRepository: AuthorizationRepository;

  async formToDomain(form: UserForm): Promise<User> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { roles, password, ...rest } = form;
    return rest;
  }

  async domainToForm(domain: User): Promise<UserForm> {
    return {
      ...domain,
      roles: await this.getRoles(domain.id),
      password: undefined,
    };
  }

  async domainToDto(user: User): Promise<UserDto> {
    const userId = user.id!;
    const roles = await this.getRoles(userId);
    const hasCredentials = await this.authorizationRepository.userHasCredentials(userId);

    return {
      ...user,
      hasCredentials,
      roles,
    };
  }

  private async getRoles(userId?: string): Promise<Role[]> {
    if (!userId) return [];
    const roles = await this.authorizationRepository.findRolesByUserId(userId);
    return roles
      .filter(role => !!ROLE_LIST.find((r: string) => r === role.name))
      .map(role => role.name as Role);
  }
}
