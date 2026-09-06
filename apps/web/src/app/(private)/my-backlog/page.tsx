'use client'

import { CurrentlyPlayingCard } from '@/features/my-backlog/components/currently-playing-card'
import {
    GameRow,
    type GameStatus,
    type LibraryGame,
} from '@/features/my-backlog/components/game-row'
import {
    type GameList,
    MyListsCard,
} from '@/features/my-backlog/components/my-lists-card'
import SearchBar from '@/features/my-backlog/components/search-bar'
import { useMemo, useState } from 'react'

const initialGames: LibraryGame[] = [
  {
    id: 1,
    title: 'Alan Wake 2',
    cover: '/games/alan-wake-cover.avif',
    genres: ['Action', 'Horror'],
    timeToBeat: '18h',
    status: 'Playing',
    inQueue: true,
  },
  {
    id: 2,
    title: 'Batman: Arkham Knight',
    cover: '/games/batman-cover.avif',
    genres: ['Action', 'Adventure'],
    timeToBeat: '27h',
    status: 'Playing',
    inQueue: false,
  },
  {
    id: 3,
    title: 'Lies of P',
    cover: '/games/lies-of-p-cover.avif',
    genres: ['RPG', 'Soulslike'],
    timeToBeat: '32h',
    status: 'Playing',
    inQueue: true,
  },
  {
    id: 4,
    title: 'Sifu',
    cover: '/games/sifu-cover.avif',
    genres: ['Action', 'Fighting'],
    timeToBeat: '14h',
    status: 'Playing',
    inQueue: false,
  },
  {
    id: 5,
    title: 'Resident Evil 9',
    cover: '/games/re9-cover.avif',
    genres: ['Horror', 'Survival'],
    timeToBeat: '20h',
    status: 'Paused',
    inQueue: false,
  },
]

const initialLists: GameList[] = [
  {
    id: 1,
    name: 'Weekend picks',
    gameCount: 8,
    description: 'Short games for a free weekend.',
  },
  {
    id: 2,
    name: 'Backlog essentials',
    gameCount: 14,
    description: 'The games I want to finish this year.',
  },
  {
    id: 3,
    name: 'Co-op nights',
    gameCount: 6,
    description: 'Games to play with friends.',
  },
  {
    id: 4,
    name: 'Horror month',
    gameCount: 5,
    description: 'A curated run of unsettling stories.',
  },
  {
    id: 5,
    name: 'Completed favorites',
    gameCount: 11,
  },
]

function MyLibraryPage() {
  const [games, setGames] = useState(initialGames)
  const [lists, setLists] = useState(initialLists)
  const [query, setQuery] = useState('')

  const filteredGames = useMemo(
    () =>
      games.filter((game) =>
        game.title.toLowerCase().includes(query.trim().toLowerCase())
      ),
    [games, query]
  )

  function handleStatusChange(id: number, status: GameStatus) {
    setGames((currentGames) =>
      currentGames.map((game) => (game.id === id ? { ...game, status } : game))
    )
  }

  function handleQueueToggle(id: number) {
    setGames((currentGames) =>
      currentGames.map((game) =>
        game.id === id ? { ...game, inQueue: !game.inQueue } : game
      )
    )
  }

  function handleCreateList() {
    const name = window.prompt('Name your new list')?.trim()

    if (!name) {
      return
    }

    setLists((currentLists) => [
      ...currentLists,
      {
        id: Date.now(),
        name,
        gameCount: 0,
      },
    ])
  }

  const currentPlayingGames = games
    .filter((game) => game.status === 'Playing')
    .slice(0, 4)

  return (
    <div className="mx-auto h-fit max-w-7xl px-4 pt-26 pb-10 sm:px-6 lg:px-8">
      <div className="flex flex-col">
        <h1 className="text-2xl font-semibold">My Library</h1>
        <h2 className="text-sm font-medium text-muted-foreground">
          Track, queue, and conquer your backlog.
        </h2>
        <SearchBar value={query} onValueChange={setQuery} />

        <div className="mt-2 grid items-start gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(18rem,1fr)] lg:gap-6">
          <section className="min-w-0">
            <div className="flex items-center gap-3 border-b border-border px-3 pb-3 sm:gap-4 sm:px-4">
              <h3 className="min-w-0 flex-1 text-sm font-semibold text-foreground">
                All games
                <span className="ml-2 text-xs font-normal text-muted-foreground">
                  {filteredGames.length}{' '}
                  {filteredGames.length === 1 ? 'game' : 'games'}
                </span>
              </h3>
              <span className="hidden w-20 shrink-0 text-xs font-medium text-muted-foreground sm:block">
                Time to beat
              </span>
              <span className="w-25 shrink-0 text-xs font-medium text-muted-foreground sm:w-28">
                Status
              </span>
              <span className="size-8 shrink-0" aria-hidden="true" />
            </div>

            <div className="mt-3 flex flex-col gap-2">
              {filteredGames.map((game) => (
                <GameRow
                  key={game.id}
                  game={game}
                  onStatusChange={handleStatusChange}
                  onQueueToggle={handleQueueToggle}
                />
              ))}
              {filteredGames.length === 0 && (
                <p className="rounded-xl border border-dashed border-border px-4 py-10 text-center text-sm text-muted-foreground">
                  No games found in your library.
                </p>
              )}
            </div>
          </section>

          <aside className="flex min-w-0 flex-col gap-6">
            {currentPlayingGames.length > 0 && (
              <section>
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="text-sm font-semibold text-foreground">
                    Currently Playing
                  </h2>
                  <span className="text-xs text-muted-foreground">
                    Active quest
                  </span>
                </div>
                <CurrentlyPlayingCard
                  games={currentPlayingGames.map((game) => ({
                    ...game,
                    platform: 'PC',
                    timeToBeat: `${game.timeToBeat} estimated`,
                  }))}
                  onStatusChange={handleStatusChange}
                />
              </section>
            )}

            <MyListsCard lists={lists} onCreateList={handleCreateList} />
          </aside>
        </div>
      </div>
    </div>
  )
}

export default MyLibraryPage
