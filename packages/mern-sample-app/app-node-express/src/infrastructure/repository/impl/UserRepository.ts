import { Repository } from "../Repository";
import { User } from "@org/lib-api-client";

export class UserRepository extends Repository<User> {
  constructor() {
    super(User);
  }
}
