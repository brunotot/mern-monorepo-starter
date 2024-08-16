import { User } from "@org/shared";
import { Repository } from "../Repository";
import { DatabaseManager } from "@org/backend/config/managers/DatabaseManager";

export class UserRepository extends Repository<User> {
  constructor() {
    super(User, ["email", "username"]);
  }

  async deleteByUsername(username: string): Promise<void> {
    const session = DatabaseManager.getInstance().session;
    await this.collection.deleteOne({ username }, { session });
  }

  async findOneByUsername(username: string): Promise<User | null> {
    return await this.collection.findOne({ username });
  }

  async findOneByRefreshTokens(refreshTokens: string[]): Promise<User | null> {
    return await this.collection.findOne({ refreshToken: refreshTokens });
  }

  //@Transactional()
  async insertOne(user: Omit<User, "_id">): Promise<User> {
    const session = DatabaseManager.getInstance().session;
    const { insertedId } = await this.collection.insertOne(user, { session });
    return { ...user, _id: insertedId };
  }

  //@Transactional()
  async updateOne(user: User): Promise<User> {
    await this.collection.updateOne({ _id: user._id }, user);
    return user;
  }
}
