export type AppEnv = {
    Bindings: {
    DB: D1Database
    JWT_SECRET: string
    IGDB_CLIENT_ID: string
    IGDB_CLIENT_SECRET: string
  }
  Variables: {
    userId: string
  }
}