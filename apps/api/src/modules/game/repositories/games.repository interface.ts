export type GameEntity = {
  gameId: number
  gameName: string
  gameSummary: string | null
  gameReleaseDate: number | null
  gameGenres: GameRelationItem[]
  gamePlatforms: GameRelationItem[]
  gameDevelopers: GameRelationItem[]
  gamePublishers: GameRelationItem[]
  gameCoverUrl: string | null
  gameTimeToBeat: number | null
}

export type GameRelationItem = {
  id: number
  name: string
}

export type NormalizedGameItem = {
  id: number
  label: string
}

export type AddGameToLibraryInput = {
  userId: string
  gameId: number
  gameName: string
  gameSummary: string | null
  gameReleaseDate: number | null
  gameGenres: Array<{ id: number; name: string }>
  gamePlatforms: Array<{ id: number; name: string }>
  involvedCompanies: Array<{
    id: number
    company: { id: number; name: string }
    publisher: boolean
  }>
  gameCoverUrl: string | null
  gameTimeToBeat: number | null
  status?: "not_started" | "playing" | "completed" | "dropped"
}

export type AddGameToLibraryEntity = {
  userId: string
  gameId: number
  status: "not_started" | "playing" | "completed" | "dropped"
}

export interface GamesRepository {
  findById(id: number): Promise<boolean>
  create(game: GameEntity): Promise<GameEntity>
  addGameToLibrary(userGame: AddGameToLibraryEntity): Promise<void>
}