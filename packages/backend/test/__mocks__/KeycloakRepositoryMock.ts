import { type IKeycloakRepository } from "../../dist/infrastructure/repository/impl/KeycloakRepository";

export class KeycloakRepositoryMock implements IKeycloakRepository {
  async findAll(): Promise<[]> {
    return [];
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async findRolesById(userId: string): Promise<string[]> {
    return ["admin"];
  }
}
