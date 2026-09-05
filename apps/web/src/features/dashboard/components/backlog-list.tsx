import { ArrowRightIcon, Clock, Dices } from 'lucide-react'
import { Button } from '@/components/ui/button'

const backlogQueue = [
  {
    id: 'alan-wake-2',
    title: 'Alan Wake 2: The Lake House',
    platform: 'PC',
    timeToBeat: '4 hours',
  },
  {
    id: 'batman-arkham',
    title: 'Batman: Arkham Knight',
    platform: 'PS5',
    timeToBeat: '16 hours',
  },
  {
    id: 'hollow-knight',
    title: 'Hollow Knight',
    platform: 'PC',
    timeToBeat: '27 hours',
  },
  {
    id: 'crash-bandicoot',
    title: 'Crash Bandicoot 4',
    platform: 'PS5',
    timeToBeat: '12 hours',
  },
  {
    id: 'dead-space',
    title: 'Dead Space',
    platform: 'PC',
    timeToBeat: '14 hours',
  },
]

export function BacklogList() {
  return (
    <section className="h-fit w-full min-w-0">
      <div className="flex h-fit flex-col overflow-hidden rounded-2xl border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold">Backlog</h3>
            <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
              83
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="h-8 gap-1.5 border-primary/30 bg-linear-to-br from-secondary/25 to-primary/15 px-3 text-[11px] font-semibold text-primary hover:scale-105 hover:text-primary hover:cursor-pointer"
          >
            <Dices size={12} />
            Pick Random
          </Button>
        </div>
        <div className="flex flex-col divide-y divide-border">
          {backlogQueue.map((game, index) => (
            <div
              key={game.id}
              className="flex items-center gap-3 px-5 py-3 transition-colors hover:bg-foreground/5"
            >
              <span
                className={`w-5 shrink-0 text-center font-mono text-[11px] font-bold ${index === 0 ? 'text-primary' : 'text-muted-foreground/40'}`}
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-semibold">{game.title}</p>
                <div className="mt-0.5 flex items-center gap-1.5">
                  <span className="rounded border border-border bg-background px-1.5 py-px text-[10px] text-muted-foreground">
                    {game.platform}
                  </span>
                  <span className="flex items-center gap-0.5 text-[10px] text-muted-foreground">
                    <Clock size={9} />
                    {game.timeToBeat}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="border-t border-border p-4">
          <Button className="h-10 w-full gap-2 rounded-xl bg-linear-to-l from-primary to-secondary text-xs font-semibold text-white shadow-primary/30 transition-all hover:scale-[1.01] hover:shadow-md hover:cursor-pointer">
            View Entire Backlog <ArrowRightIcon size={14} />
          </Button>
        </div>
      </div>
    </section>
  )
}
