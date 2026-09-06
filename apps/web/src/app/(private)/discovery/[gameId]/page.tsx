import { GameDetailsPage } from '@/features/game-details/components/game-details-page'
import { getGameDetails } from '@/features/game-details/data'
import { notFound } from 'next/navigation'

type GameDetailsRouteProps = {
  params: Promise<{ gameId: string }>
}

export default async function GameDetailsRoute({
  params,
}: GameDetailsRouteProps) {
  const { gameId } = await params
  const game = getGameDetails(gameId)

  if (!game) {
    notFound()
  }

  return <GameDetailsPage initialGame={game} />
}
