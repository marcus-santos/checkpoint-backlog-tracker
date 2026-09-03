import type { Context } from "hono"
import { setCookie } from "hono/cookie"
import { sign } from "hono/jwt"
import type { AppEnv } from "../../../env"

type AuthUser = {
  id: string
  email: string
}

export async function setAuthCookie(c: Context<AppEnv>, user: AuthUser) {
  if (!c.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured")
  }

  const token = await sign(
    {
      sub: user.id,
      email: user.email,
    },
    c.env.JWT_SECRET,
    'HS256'
  )

  setCookie(c, "auth_token", token, {
    httpOnly: true,
    secure: new URL(c.req.url).protocol === "https:",
    sameSite: "Lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  })
}