import { Context } from "hono";
import { AppEnv } from "../../../env";
import { DrizzleUserRepository } from "../repositories/user.repository";

export class GetUserUseCase {
  constructor(private readonly c: Context<AppEnv>) {}

  async execute(userId: string) {
    const userRepository = new DrizzleUserRepository(this.c.env.DB);
    const user = await userRepository.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    return user
  }

}