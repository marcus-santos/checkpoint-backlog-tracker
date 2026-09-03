import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { z } from 'zod';
import type { AppEnv } from '../../env';
import { AuthController } from './auth.controller';

export const registerBodySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long'),
  username: z.string().min(3, 'Username must be at least 3 characters long')
  .regex(/^[a-zA-Z0-9_-]+$/, 'Username can only contain letters, numbers, underscores, and hyphens'),
  email: z.string().email('Invalid email address'),

  password: z.string().min(6, 'Password must be at least 6 characters long')
  .and(z.string().regex(/[A-Z]/, 'Password must contain at least one uppercase letter'))
  .and(z.string().regex(/[a-z]/, 'Password must contain at least one lowercase letter'))
  .and(z.string().regex(/[0-9]/, 'Password must contain at least one number'))
  .and(z.string().regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character')),
})

export const authRoutes = new Hono<AppEnv>()

authRoutes.post('/register', zValidator('json', registerBodySchema), (c) =>
  AuthController.register(c, c.req.valid('json'))
)

export const loginBodySchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
})

authRoutes.post('/login', zValidator('json', loginBodySchema), (c) =>
  AuthController.login(c, c.req.valid('json'))
)

