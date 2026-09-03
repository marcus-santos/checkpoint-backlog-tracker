import { Context } from "hono";
import { AppEnv } from "../../env";
import { DeleteUserUseCase } from "./use-cases/delete-user.use-case";
import { GetUserUseCase } from "./use-cases/get-user.use-case";

export class UserController {
  static async getUser(c: Context<AppEnv>, userId: string) {
    try {
      const getUserUseCase = new GetUserUseCase(c);
      const user = await getUserUseCase.execute(userId);
      
      return c.json(user);
    
    } catch (error) {
      return c.json({ error: "Could not find user" }, 500);
    }
  }

  static async deleteUser(c: Context<AppEnv>, userId: string) {
    try {
      const deleteUserUseCase = new DeleteUserUseCase(c);
      await deleteUserUseCase.execute(userId);
      
      return c.json({ message: "User deleted successfully" }, 200);
      
    } catch (error) {
      return c.json({ error: "Could not delete user" }, 500);
    }

  }
}