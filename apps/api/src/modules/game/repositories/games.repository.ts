import { eq } from "drizzle-orm";
import { drizzle, DrizzleD1Database } from "drizzle-orm/d1";
import { developers, gameDevelopers, gameGenres, gamePlatforms, gamePublishers, games, genres, platforms, publishers, userGames } from "../../../config/db/schema";
import { AddGameToLibraryEntity, GameEntity, GamesRepository } from "./games.repository interface";

export class DrizzleGamesRepository implements GamesRepository {
  private db: DrizzleD1Database;

  constructor(d1Binding: D1Database) {
    this.db = drizzle(d1Binding);
  }

  async findById(id: number): Promise<boolean> {
    const result = await this.db
      .select({ id: games.id })
      .from(games)
      .where(eq(games.id, id))
      .get()

    return !!result
  }

  async create(game: GameEntity): Promise<GameEntity> {
    await this.db.insert(games).values({
      id: game.gameId,
      name: game.gameName,
      summary: game.gameSummary,
      releaseDate: game.gameReleaseDate ? new Date(game.gameReleaseDate * 1000) : null,
      coverUrl: game.gameCoverUrl,
      timeToBeat: game.gameTimeToBeat,
    })

    await Promise.all(
      game.gameGenres.map((genre) =>
        this.db.insert(genres).values({
          id: genre.id,
          name: genre.name,
        }).onConflictDoNothing()
      )
    )

    await Promise.all(
      game.gamePlatforms.map((platform) =>
        this.db.insert(platforms).values({
          id: platform.id,
          name: platform.name,
        }).onConflictDoNothing()
      )
    )

    await Promise.all(
      game.gameDevelopers.map((developer) =>
        this.db.insert(developers).values({
          id: developer.id,
          name: developer.name,
        }).onConflictDoNothing()
      )
    )

    await Promise.all(
      game.gamePublishers.map((publisher) =>
        this.db.insert(publishers).values({
          id: publisher.id,
          name: publisher.name,
        }).onConflictDoNothing()
      )
    )

    await Promise.all(
      game.gamePlatforms.map((platform) =>
        this.db.insert(gamePlatforms).values({
          gameId: game.gameId,
          platformId: platform.id,
        }).onConflictDoNothing()
      )
    )

    await Promise.all(
      game.gameDevelopers.map((developer) =>
        this.db.insert(gameDevelopers).values({
          gameId: game.gameId,
          developerId: developer.id,
        }).onConflictDoNothing()
      )
    )

    await Promise.all(
      game.gamePublishers.map((publisher) =>
        this.db.insert(gamePublishers).values({
          gameId: game.gameId,
          publisherId: publisher.id,
        }).onConflictDoNothing()
      )
    )

    await Promise.all(
      game.gameGenres.map((genre) =>
        this.db.insert(gameGenres).values({
          gameId: game.gameId,
          genreId: genre.id,
        }).onConflictDoNothing()
      )
    )

    return game
  }

  async addGameToLibrary(userGame: AddGameToLibraryEntity): Promise<void> {
    await this.db.insert(userGames).values({
      userId: userGame.userId,
      gameId: userGame.gameId,
      status: userGame.status,
    })
  }
  }