import { MiddlewareHandler } from "hono";
import { getCookie } from "hono/cookie";
import { verify } from "hono/jwt";
import { AppEnv } from "../../env";

export const requireAuth: MiddlewareHandler<AppEnv> = async (c, next) => {
  let token: string | undefined

  token = getCookie(c, "auth_token");
  
  if (!token) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  try {
    const payload = await verify(token, c.env.JWT_SECRET, 'HS256');
    const userId = payload.sub as string

    console.log("Authenticated user ID:", payload.sub);
    c.set('userId', userId);


    return next();
  } catch (error) {
    console.error("JWT verification error:", error);
    return c.json({ error: "Unauthorized" }, 401);
  }
}