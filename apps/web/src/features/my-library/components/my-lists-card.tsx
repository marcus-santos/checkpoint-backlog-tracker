import { Button } from '@/components/ui/button'
import { ListPlus } from 'lucide-react'

export type GameList = {
  id: number
  name: string
  gameCount: number
  description?: string
}

type MyListsCardProps = {
  lists: GameList[]
  onCreateList: () => void
}

function MyListsCard({ lists, onCreateList }: MyListsCardProps) {
  return (
    <article className="flex h-full min-h-96 flex-col rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/40">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-foreground">My lists</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Keep your library organized by mood, platform, or goal.
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onCreateList}
          aria-label="Create a new game list"
        >
          <ListPlus aria-hidden="true" />
          New list
        </Button>
      </div>

      <div className="mt-4 min-h-0 flex-1 overflow-y-auto pr-1">
        <div className="flex flex-col gap-2">
          {lists.map((list) => (
            <div
              key={list.id}
              className="rounded-lg border border-border bg-muted/50 px-3 py-3 transition-colors hover:border-primary/30 hover:bg-muted"
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="truncate text-sm font-medium text-foreground">
                  {list.name}
                </h3>
                <span className="shrink-0 text-xs text-muted-foreground">
                  {list.gameCount} {list.gameCount === 1 ? 'game' : 'games'}
                </span>
              </div>
              {list.description && (
                <p className="mt-1 truncate text-xs text-muted-foreground">
                  {list.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </article>
  )
}

export { MyListsCard }
