import type { Context } from "hono";
import type { AppEnv } from "../../../env";
import { igdbGetGameTimeToBeat } from "../../../services/igdb/igdb-client.service";
import { DrizzleGamesRepository } from "../repositories/games.repository";
import type { AddGameToLibraryInput, GameEntity, GameRelationItem } from "../repositories/games.repository interface";

type GameApiGenre = { id: number; name: string }
type GameApiPlatform = { id: number; name: string }
type GameApiCompany = { id: number; name: string }
type GameApiInvolvedCompany = { id: number; company: GameApiCompany; publisher: boolean }

type AddGameToLibraryRequest = AddGameToLibraryInput

const toNormalizedItems = <T extends { id: number; name: string }>(items: T[]): GameRelationItem[] =>
  items.map((item) => ({ id: item.id, name: item.name }))

export class AddGameToLibraryUseCase {
  constructor(private readonly c: Context<AppEnv>) {}

  async execute({
    userId,
    gameId,
    gameName,
    gameSummary,
    gameReleaseDate,
    gameGenres,
    gamePlatforms,
    involvedCompanies,
    gameCoverUrl,
    status = "not_started",
  }: AddGameToLibraryRequest) {
    const gamesRepository = new DrizzleGamesRepository(this.c.env.DB)
    const gameExists = await gamesRepository.findById(gameId)

    const developers = involvedCompanies
      .filter((company) => !company.publisher)
      .map((company) => ({ id: company.company.id, name: company.company.name }))

    const publishers = involvedCompanies
      .filter((company) => company.publisher)
      .map((company) => ({ id: company.company.id, name: company.company.name }))


    if (!gameExists) {
      const { timeToBeat } = await igdbGetGameTimeToBeat(this.c, gameId)

      const normalizedGame: GameEntity = {
        gameId,
        gameName,
        gameSummary,
        gameReleaseDate,
        gameGenres: toNormalizedItems(gameGenres as GameApiGenre[]),
        gamePlatforms: toNormalizedItems(gamePlatforms as GameApiPlatform[]),
        gameDevelopers: developers,
        gamePublishers: publishers,
        gameCoverUrl,
        gameTimeToBeat: timeToBeat,
      }

      await gamesRepository.create(normalizedGame)
    }

    await gamesRepository.addGameToLibrary({
      userId,
      gameId,
      status,
    })

    return {
      success: true,
    }
  }
}
