import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable('users', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text('name').notNull(),
  username: text('username').notNull().unique(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  createdAt: integer('created_at', {mode: 'timestamp'}).$default(() => new Date()).notNull(),
  favoriteGameId: integer('favorite_game_id').references(() => games.id),
  profilePicture: text('profile_picture'),
  coverPicture: text('cover_picture'),
})

export const userGames = sqliteTable('user_games', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text('user_id').notNull().references(() => users.id),
  gameId: integer('game_id').notNull().references(() => games.id),
  status: text('status').notNull(),
  createdAt: integer('created_at', {mode: 'timestamp'}).$default(() => new Date()).notNull(),
})

export const games = sqliteTable('games', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  summary: text('summary'),
  releaseDate: integer('release_date', {mode: 'timestamp'}),
  coverUrl: text('cover_url'),
  timeToBeat: integer('time_to_beat'),
})

export const genres = sqliteTable('genres', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
})

export const platforms = sqliteTable('platforms', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
})

export const developers = sqliteTable('developers', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
})

export const publishers = sqliteTable('publishers', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
})

export const gameGenres = sqliteTable('game_genres', {
  gameId: integer('game_id').notNull().references(() => games.id),
  genreId: integer('genre_id').notNull().references(() => genres.id),
})

export const gamePlatforms = sqliteTable('game_platforms', {
  gameId: integer('game_id').notNull().references(() => games.id),
  platformId: integer('platform_id').notNull().references(() => platforms.id),
})

export const gameDevelopers = sqliteTable('game_developers', {
  gameId: integer('game_id').notNull().references(() => games.id),
  developerId: integer('developer_id').notNull().references(() => developers.id),
})

export const gamePublishers = sqliteTable('game_publishers', {
  gameId: integer('game_id').notNull().references(() => games.id),
  publisherId: integer('publisher_id').notNull().references(() => publishers.id),
})

export const thirdPartyTokens = sqliteTable('third_party_tokens', {
  service: text('service').notNull().primaryKey(),
  token: text('token').notNull(),
  expiresAt: integer('expires_at', {mode: 'timestamp'}).notNull(),
  type: text('type').notNull(),
})