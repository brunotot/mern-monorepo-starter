import { PaginationOptions, type TODO } from "@org/shared";
import { type PaginationResult } from "@org/shared";
import { type UserRepository } from "@org/backend/infrastructure/repository/impl/UserRepository";
import { type User } from "@org/shared";
import { autowired } from "@org/backend/decorators/autowired";
import { type KeycloakUser, type KeycloakRepository } from "../repository/impl/KeycloakRepository";

export class UserService {
  @autowired private userRepository: UserRepository;
  @autowired private keycloakRepository: KeycloakRepository;

  async search(options: Partial<PaginationOptions>): Promise<PaginationResult<User>> {
    return this.userRepository.search(PaginationOptions.parse(options));
  }

  async findAll(): Promise<KeycloakUser[]> {
    return this.keycloakRepository.findAll();
  }

  async create(user: User): Promise<User> {
    return this.userRepository.insertOne(user) as TODO;
  }

  async deleteByUsername(username: string): Promise<void> {
    return this.userRepository.deleteByUsername(username);
  }
}
