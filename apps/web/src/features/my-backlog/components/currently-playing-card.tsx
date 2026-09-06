'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { GameStatus } from '@/features/my-backlog/components/game-row'
import Image from 'next/image'

export type CurrentlyPlayingGame = {
  id: number
  title: string
  cover: string
  platform: string
  timeToBeat: string
  status: GameStatus
}

type CurrentlyPlayingCardProps = {
  games: CurrentlyPlayingGame[]
  onStatusChange?: (id: number, status: GameStatus) => void
}

function CurrentlyPlayingCard({
  games,
  onStatusChange,
}: CurrentlyPlayingCardProps) {
  return (
    <article className="rounded-xl border border-border bg-card p-2 transition-colors hover:border-primary/40">
      <div className="grid grid-cols-2 gap-2">
        {games.slice(0, 4).map((game) => (
          <div
            key={game.id}
            className="group min-w-0 overflow-hidden rounded-lg border border-border bg-background"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-muted">
              <Image
                src={game.cover}
                alt={`${game.title} cover`}
                fill
                sizes="(min-width: 1024px) 180px, 50vw"
                className="object-cover brightness-75 transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/20 to-transparent" />
              <div className="absolute inset-x-2 bottom-2">
                <h3 className="truncate text-xs font-semibold text-foreground">
                  {game.title}
                </h3>
                <p className="mt-0.5 truncate text-[10px] text-muted-foreground">
                  {game.platform}
                </p>
              </div>
            </div>

            <div className="space-y-2 p-2">
              <div className="flex items-center justify-between gap-2 text-[10px]">
                <span className="text-muted-foreground">Time to beat</span>
                <span className="truncate font-medium text-foreground">
                  {game.timeToBeat}
                </span>
              </div>
              <Select
                value={game.status}
                onValueChange={(value) =>
                  onStatusChange?.(game.id, value as GameStatus)
                }
              >
                <SelectTrigger
                  size="sm"
                  aria-label={`${game.title} status`}
                  className="h-7 w-full border-border bg-muted text-[10px]"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Backlog">Backlog</SelectItem>
                  <SelectItem value="Playing">Playing</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Paused">Paused</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        ))}
      </div>
    </article>
  )
}

export { CurrentlyPlayingCard }
