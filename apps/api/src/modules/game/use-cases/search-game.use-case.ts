import type { Context } from "hono";
import type { AppEnv } from "../../../env";
import { igdbSearchGames } from "../../../services/igdb/igdb-client.service";

type SearchGameRequest = {
  gameName: string;
};

export class SearchGameUseCase {
  constructor(private readonly c: Context<AppEnv>) {}

  async execute({ gameName }: SearchGameRequest) {
    const games = await igdbSearchGames(this.c, gameName);

    return {
      games,
    };
  }
}