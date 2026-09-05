'use client'

import { MoreHorizontal } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export type CurrentlyPlayingStatus =
  | 'not-started'
  | 'ongoing'
  | 'completed'
  | 'dropped'

export type CurrentlyPlayingGame = {
  id: string
  title: string
  imageSrc: string
  imageAlt: string
  timeToBeat: string
  platform: string
  status: CurrentlyPlayingStatus
}

export const mockCurrentlyPlayingGames: CurrentlyPlayingGame[] = [
  {
    id: 'resident-evil-requiem',
    title: 'Resident Evil Requiem',
    imageSrc: '/games/re9-cover.avif',
    imageAlt: 'Resident Evil Requiem cover',
    timeToBeat: '12-15 hours',
    platform: 'PS5',
    status: 'ongoing',
  },
  {
    id: 'alan-wake-2',
    title: 'Alan Wake 2',
    imageSrc: '/games/alan-wake-cover.avif',
    imageAlt: 'Alan Wake 2 cover',
    timeToBeat: '20 hours',
    platform: 'PC',
    status: 'ongoing',
  },
  {
    id: 'lies-of-p',
    title: 'Lies of P',
    imageSrc: '/games/lies-of-p-cover.avif',
    imageAlt: 'Lies of P cover',
    timeToBeat: '30-35 hours',
    platform: 'PS5',
    status: 'ongoing',
  },
]

type DashboardGameCardProps = {
  game: CurrentlyPlayingGame
  status: CurrentlyPlayingStatus
  onStatusChange: (status: CurrentlyPlayingStatus) => void
}

const statusOptions: {
  value: CurrentlyPlayingStatus
  label: string
  className: string
}[] = [
  {
    value: 'not-started',
    label: 'Not started',
    className: 'text-muted-foreground',
  },
  { value: 'ongoing', label: 'Ongoing', className: 'text-blue-400' },
  { value: 'completed', label: 'Completed', className: 'text-green-500' },
  { value: 'dropped', label: 'Dropped', className: 'text-red-400' },
]

function DashboardGameCard({
  game,
  status,
  onStatusChange,
}: DashboardGameCardProps) {
  return (
    <article className="min-w-0 overflow-hidden rounded-2xl border border-border bg-background shadow-md shadow-background transition-all duration-300 hover:scale-[1.01] hover:shadow-primary/40 hover:shadow-xl">
      <Image
        src={game.imageSrc}
        alt={game.imageAlt}
        width={640}
        height={380}
        className="w-full border-b border-border object-cover"
      />
      <div className="flex flex-col gap-3 p-3">
        <h4 className="text-sm font-semibold leading-5 text-foreground">
          {game.title}
        </h4>
        <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
          <span>Time to beat</span>
          <span className="text-right text-foreground">{game.timeToBeat}</span>
        </div>
        <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
          <span>Platform</span>
          <span className="rounded-md border border-border bg-card px-2 py-1 text-foreground">
            {game.platform}
          </span>
        </div>
        <Select
          value={status}
          onValueChange={(value) =>
            onStatusChange(value as CurrentlyPlayingStatus)
          }
        >
          <SelectTrigger
            id={`${game.id}-status`}
            aria-label={`${game.title} status`}
            className={`h-9 w-full bg-card cursor-pointer ${statusOptions.find((option) => option.value === status)?.className ?? 'text-foreground'}`}
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                className={`${option.className} focus:bg-accent cursor-pointer`}
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </article>
  )
}

type CurrentlyPlayingProps = {
  games?: CurrentlyPlayingGame[]
  onStatusChange?: (gameId: string, status: CurrentlyPlayingStatus) => void
}

export function CurrentlyPlaying({
  games,
  onStatusChange,
}: CurrentlyPlayingProps) {
  const displayedGames = games ?? mockCurrentlyPlayingGames
  const [gameStatuses, setGameStatuses] = useState<
    Record<string, CurrentlyPlayingStatus>
  >(() =>
    Object.fromEntries(displayedGames.map((game) => [game.id, game.status]))
  )

  function handleStatusChange(gameId: string, status: CurrentlyPlayingStatus) {
    setGameStatuses((currentStatuses) => ({
      ...currentStatuses,
      [gameId]: status,
    }))
    onStatusChange?.(gameId, status)
  }

  return (
    <section className="h-fit w-full min-w-0">
      <div className="gap-3 rounded-2xl border border-primary/30 bg-card p-4">
        <div className="flex items-center justify-between px-2 font-semibold">
          <div className="flex min-w-0 items-center gap-2">
            <div className="relative flex size-2 shrink-0">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary/40" />
              <span className="relative inline-flex size-2 rounded-full bg-primary" />
            </div>
            <span>Currently Playing</span>
            <span className="rounded-xl border border-primary bg-primary/20 px-2 py-1 text-xs text-primary">
              Active Quest
            </span>
          </div>
          <button
            type="button"
            aria-label="More currently playing options"
            className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <MoreHorizontal size={16} aria-hidden="true" />
          </button>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {displayedGames.map((game) => (
            <DashboardGameCard
              key={game.id}
              game={game}
              status={gameStatuses[game.id] ?? game.status}
              onStatusChange={(status) => handleStatusChange(game.id, status)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
