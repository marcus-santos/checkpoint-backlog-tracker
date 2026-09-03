import { Hono } from "hono";
import { AppEnv } from "../../env";
import { requireAuth } from "../auth/auth.middleware";
import { UserController } from "./user.controller";

export const userRoutes = new Hono<AppEnv>()

userRoutes.use('*', requireAuth)

userRoutes.get('/:userId', async (c) => {
  return UserController.getUser(c, c.get('userId'));
})

userRoutes.delete('/:userId', async (c) => {
  return UserController.deleteUser(c, c.get('userId'));
})