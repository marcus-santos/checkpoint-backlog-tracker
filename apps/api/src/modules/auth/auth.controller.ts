import { Context } from "hono";
import { z } from "zod";
import type { AppEnv } from "../../env";
import { loginBodySchema, registerBodySchema } from "./auth.routes";
import { DrizzleAuthRepository } from "./repositories/auth.repository";
import { LoginUseCase } from "./use-cases/login-use.case";
import { RegisterUseCase } from "./use-cases/register.use-case";
import { setAuthCookie } from "./utils/auth-cookie";

type RegisterInput = z.infer<typeof registerBodySchema>;
type LoginInput = z.infer<typeof loginBodySchema>;

export class AuthController {
  static async register(c: Context<AppEnv>, body: RegisterInput) {
    const { name, username, email, password } = body;

    try {
      const authRepository = new DrizzleAuthRepository(c.env.DB);
      const registerUseCase = new RegisterUseCase(authRepository);

      const result = await registerUseCase.execute({ name, username, email, password });

      await setAuthCookie(c, {
        id: result.user.id,
        email: result.user.email,
      });

      return c.json({ message: 'Registration successful', user: result.user }, 201);
    } catch (error: any) {
      return c.json({ error: error.message || 'Internal server error' }, 500);
    }
  }

  static async login(c: Context<AppEnv>, body: LoginInput) {
    const { email, password } = body;

    try {
      const authRepository = new DrizzleAuthRepository(c.env.DB);
      const loginUseCase = new LoginUseCase(authRepository);

      const result = await loginUseCase.execute({ email, password });

      await setAuthCookie(c, {
        id: result.user.id,
        email: result.user.email,
      });

      return c.json({ message: 'Login successful', user: result.user }, 200);
    } catch (error: any) {
      if (error.message === 'User not found') {
        return c.json({ error: error.message }, 404);
      }

      if (error.message === 'Invalid password') {
        return c.json({ error: error.message }, 401);
      }

      return c.json({ error: error.message || 'Internal server error' }, 500);
    }
  }
}