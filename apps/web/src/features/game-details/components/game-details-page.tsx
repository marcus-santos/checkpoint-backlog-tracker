'use client'

import { useState } from 'react'
import type { GameDetails, UserGameStatus } from '../types'
import { GameDetailsSidebar } from './game-details-sidebar'
import { GameHero } from './game-hero'
import { GameMediaShowcase } from './game-media-showcase'
import { GameOverview } from './game-overview'
import { GameReviews } from './game-reviews'

function GameDetailsPage({ initialGame }: { initialGame: GameDetails }) {
  const [game, setGame] = useState(initialGame)

  function handleStatusChange(status: UserGameStatus) {
    setGame((currentGame) => ({
      ...currentGame,
      status,
      loggedHours:
        status === 'ongoing' && currentGame.loggedHours === 0
          ? 1
          : currentGame.loggedHours,
    }))
  }

  return (
    <div className="min-h-screen">
      <GameHero game={game} onStatusChange={handleStatusChange} />
      <main className="mx-auto grid w-full max-w-7xl grid-cols-1 items-start gap-8 px-4 py-8 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="flex min-w-0 flex-col gap-10 lg:col-span-8">
          <GameMediaShowcase media={game.media} />
          <GameOverview
            synopsis={game.synopsis}
            overview={game.overview}
            features={game.features}
          />
          <GameReviews game={game} />
        </div>
        <div className="lg:col-span-4">
          <GameDetailsSidebar game={game} />
        </div>
      </main>
    </div>
  )
}

export { GameDetailsPage }
