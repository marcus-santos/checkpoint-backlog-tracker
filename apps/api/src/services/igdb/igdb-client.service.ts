import type { Context } from "hono";
import type { AppEnv } from "../../env";
import { IgdbAuthService } from "./igdb-auth.service";
import { DrizzleIgdbAuthRepository } from "./repositories/igdb-auth.repository";

type igdbGetGameTimeToBeatResponse = {
  game_id: number
  normally: number | null
}

export const igdbSearchGames = async (c: Context<AppEnv>, gameName: string) => {
  const igdbAuthRepository = new DrizzleIgdbAuthRepository(c.env.DB);

  const igdbAuthService = new IgdbAuthService(
    c.env.IGDB_CLIENT_ID,
    c.env.IGDB_CLIENT_SECRET,
    igdbAuthRepository
  );

  const accessToken = await igdbAuthService.getValidToken();

  const response = await fetch("https://api.igdb.com/v4/games", {
      method: "POST",
      headers: {
        "Client-ID": c.env.IGDB_CLIENT_ID,
        Authorization: `Bearer ${accessToken.access_token}`,
        "Content-Type": "text/plain",
      },
      body:`search "${gameName}"; 
      fields name, summary, cover.url, first_release_date, platforms.name, genres.name, involved_companies.company.name,
      involved_companies.publisher; 
      where version_parent = null & 
      (game_type = 0 | game_type = 8);
      limit 15;`,
    });

  


  if (!response.ok) {
    throw new Error(`Failed to fetch IGDB games: ${response.statusText}`);
  }

  return response.json();
};


export const igdbGetGameTimeToBeat = async (c: Context<AppEnv>, gameId: number) => {
const igdbAuthRepository = new DrizzleIgdbAuthRepository(c.env.DB);

  const igdbAuthService = new IgdbAuthService(
    c.env.IGDB_CLIENT_ID,
    c.env.IGDB_CLIENT_SECRET,
    igdbAuthRepository
  );

  const accessToken = await igdbAuthService.getValidToken();

  const response = await fetch("https://api.igdb.com/v4/game_time_to_beats", {
      method: "POST",
      headers: {
        "Client-ID": c.env.IGDB_CLIENT_ID,
        Authorization: `Bearer ${accessToken.access_token}`,
        "Content-Type": "text/plain",
      },
      body:`fields *; where game_id = ${gameId};`,
    });

    console.log("IGDB Get Game Time to Beat Response:", response);

  if (!response.ok) {
    throw new Error(`Failed to fetch IGDB game time to beat: ${response.statusText}`);
  }

  const data = await response.json() as igdbGetGameTimeToBeatResponse[];
  console.log("IGDB Get Game Time to Beat Data:", data.toString());

  const timeToBeat = data[0]?.normally ?? null

  console.log("IGDB Get Game Time to Beat Data:", timeToBeat);

  return { timeToBeat };
}