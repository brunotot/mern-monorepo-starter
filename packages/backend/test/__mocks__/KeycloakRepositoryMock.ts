import { type AuthorizationRepository } from "../../dist/interface/AuthorizationRepository";
export class KeycloakRepositoryMock implements AuthorizationRepository {
  async findAll(): Promise<[]> {
    return [];
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async findRolesById(userId: string): Promise<string[]> {
    return ["admin"];
  }
}
