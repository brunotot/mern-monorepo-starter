import { ErrorResponse, PaginationOptions, type TODO } from "@org/shared";
import { type PaginationResult } from "@org/shared";
import { type UserRepository } from "@org/backend/infrastructure/repository/impl/UserRepository";
import { type User } from "@org/shared";
import { autowired } from "@org/backend/decorators/autowired";
import { type KeycloakUser, type KeycloakRepository } from "../repository/impl/KeycloakRepository";

export class UserService {
  @autowired private userRepository: UserRepository;
  @autowired private keycloakRepository: KeycloakRepository;

  async search(options: Partial<PaginationOptions>): Promise<PaginationResult<User>> {
    return await this.userRepository.findAllPaginated(PaginationOptions.parse(options));
  }

  async findAll(): Promise<KeycloakUser[]> {
    return await this.keycloakRepository.findAllUsers();
  }

  async findOneByUsername(username: string): Promise<KeycloakUser> {
    const user = await this.keycloakRepository.findUserByUsername(username);
    if (user === null) throw new ErrorResponse("", 404, "User not found");
    return user;
  }

  async create(user: User): Promise<User> {
    return (await this.userRepository.insertOne(user)) as TODO;
  }

  async deleteByUsername(username: string): Promise<void> {
    return await this.userRepository.deleteByUsername(username);
  }
}
