import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { z } from 'zod';
import type { AppEnv } from '../../env';
import { requireAuth } from '../auth/auth.middleware';
import { GameController } from './game.controller';

export const searchGameBodySchema = z.object({
  gameName: z.string().min(1, 'Game name is required'),
})

export const addGameToLibraryBodySchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  gameId: z.number().int().min(1, 'Game ID is required'),
  gameName: z.string().min(1, 'Game name is required'),
  gameSummary: z.string().nullable().optional(),
  gameReleaseDate: z.number().nullable().optional(),
  gameGenres: z.array(z.object({ id: z.number().int(), name: z.string() })).default([]),
  gamePlatforms: z.array(z.object({ id: z.number().int(), name: z.string() })).default([]),
  involvedCompanies: z.array(z.object({
    id: z.number().int(),
    company: z.object({
      id: z.number().int(),
      name: z.string(),
    }),
    publisher: z.boolean(),
  })).default([]),
  gameCoverUrl: z.string().nullable().optional(),
  gameTimeToBeat: z.number().nullable().optional(),
  status: z.enum(['not_started', 'playing', 'completed', 'dropped']).optional(),
})

export const gameRoutes = new Hono<AppEnv>()

gameRoutes.use('*', requireAuth)

gameRoutes.post('/search', zValidator('json', searchGameBodySchema), (c) =>
  GameController.search(c, c.req.valid('json'))
)

gameRoutes.post('/add-to-library', zValidator('json', addGameToLibraryBodySchema), (c) =>
  GameController.addGameToLibrary(c, c.req.valid('json'), c.get('userId'))
)

