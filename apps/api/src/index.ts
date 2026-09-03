import { Hono } from 'hono'
import type { AppEnv } from './env'
import { authRoutes } from './modules/auth/auth.routes'
import { gameRoutes } from './modules/game/game.routes'

const app = new Hono<AppEnv>()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/auth', authRoutes)
app.route('/games', gameRoutes)

export default app
