import { Repository } from "../Repository";
import { User } from "@org/shared";

export class UserRepository extends Repository<User> {
  constructor() {
    super(User, ["email", "username"]);
  }

  async deleteByUsername(username: string): Promise<void> {
    await this.deleteOne({ username });
  }

  async findOneByUsername(username: string): Promise<User | null> {
    return await this.findOne({ username });
  }

  async findOneByRefreshTokens(refreshTokens: string[]): Promise<User | null> {
    return await this.findOne({ refreshToken: refreshTokens });
  }
}
