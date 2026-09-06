import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Check, Clock3, ListPlus } from 'lucide-react'
import Image from 'next/image'

export type GameStatus = 'Backlog' | 'Playing' | 'Completed' | 'Paused'

export type LibraryGame = {
  id: number
  title: string
  cover: string
  genres: string[]
  timeToBeat: string
  status: GameStatus
  inQueue: boolean
}

type GameRowProps = {
  game: LibraryGame
  onStatusChange: (id: number, status: GameStatus) => void
  onQueueToggle: (id: number) => void
}

function GameRow({ game, onStatusChange, onQueueToggle }: GameRowProps) {
  return (
    <article className="group flex min-w-0 items-center gap-3 rounded-xl border border-border bg-card px-3 py-3 transition-colors hover:border-primary/40 hover:bg-accent sm:gap-4 sm:px-4">
      <div className="relative size-12 shrink-0 overflow-hidden rounded-lg border border-border bg-muted sm:h-14 sm:w-10">
        <Image
          src={game.cover}
          alt={`${game.title} cover`}
          fill
          sizes="40px"
          className="object-cover"
        />
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-card-foreground">
          {game.title}
        </p>
        <div className="mt-1 flex flex-wrap gap-1">
          {game.genres.map((genre) => (
            <span
              key={genre}
              className="rounded-md bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground"
            >
              {genre}
            </span>
          ))}
        </div>
      </div>

      <div className="hidden shrink-0 items-center gap-1.5 text-muted-foreground sm:flex sm:w-20">
        <Clock3 className="size-3.5" aria-hidden="true" />
        <span className="text-xs font-medium">{game.timeToBeat}</span>
      </div>

      <Select
        value={game.status}
        onValueChange={(status) =>
          onStatusChange(game.id, status as GameStatus)
        }
      >
        <SelectTrigger
          size="sm"
          aria-label={`Status for ${game.title}`}
          className="w-25 border-border bg-muted text-xs sm:w-28"
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

      <button
        type="button"
        onClick={() => onQueueToggle(game.id)}
        aria-label={
          game.inQueue
            ? `Remove ${game.title} from queue`
            : `Add ${game.title} to queue`
        }
        title={game.inQueue ? 'Remove from queue' : 'Add to queue'}
        className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-border bg-muted text-muted-foreground transition-colors hover:border-primary/50 hover:bg-primary/10 hover:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        data-queued={game.inQueue}
      >
        {game.inQueue ? (
          <Check className="size-4" aria-hidden="true" />
        ) : (
          <ListPlus className="size-4" aria-hidden="true" />
        )}
      </button>
    </article>
  )
}

export { GameRow }
