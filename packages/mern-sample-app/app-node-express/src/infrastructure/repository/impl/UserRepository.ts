import { Repository } from "../Repository";
import { User } from "@org/lib-commons";

export class UserRepository extends Repository<User> {
  constructor() {
    super(User, ["email", "username"]);
  }

  public async deleteOneByUsername(username: string): Promise<void> {
    await this.deleteOne({ username });
  }

  public async findOneByUsername(username: string): Promise<User | null> {
    return await this.findOne({ username });
  }
}
