import type { Context } from "hono";
import type { AppEnv } from "../../env";
import { AddGameToLibraryUseCase } from "./use-cases/add-game-to-library.use-case";
import { SearchGameUseCase } from "./use-cases/search-game.use-case";

type SearchGameInput = {
  gameName: string;
};

export class GameController {
  static async search(c: Context<AppEnv>, body: SearchGameInput) {
    try {


      const searchGameUseCase = new SearchGameUseCase(c);
      const result = await searchGameUseCase.execute({ gameName: body.gameName });

      return c.json(result, 200);
    } catch (error: any) {
      return c.json({ error: error.message || "Internal server error" }, 500);
    }
  }

  static async addGameToLibrary(c: Context<AppEnv>, body: any, userId: string) {
    try {
      const addGameToLibraryUseCase = new AddGameToLibraryUseCase(c);
      const result = await addGameToLibraryUseCase.execute({
        userId: userId,
        gameId: body.gameId,
        gameName: body.gameName,
        gameSummary: body.gameSummary,
        gameReleaseDate: body.gameReleaseDate,
        gameGenres: body.gameGenres,
        gamePlatforms: body.gamePlatforms,
        involvedCompanies: body.involvedCompanies,
        gameCoverUrl: body.gameCoverUrl,
        gameTimeToBeat: body.gameTimeToBeat,
        status: body.status || "not_started",
      });

      return c.json(result, 200);
    } catch (error: any) {
      return c.json({ error: error.message || "Internal server error" }, 500);
    }
  }
}