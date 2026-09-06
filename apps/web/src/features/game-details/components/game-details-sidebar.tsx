import {
    ExternalLink,
    Gamepad2,
    Globe,
    ShoppingBag,
    Timer,
    Users,
} from 'lucide-react'
import type { GameDetails } from '../types'

const tones = {
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  success: 'bg-emerald-400',
  warning: 'bg-amber-300',
}

function GameDetailsSidebar({ game }: { game: GameDetails }) {
  return (
    <aside className="flex flex-col gap-5">
      <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5 shadow-xl">
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
            <ShoppingBag
              className="size-5 text-emerald-300"
              aria-hidden="true"
            />
            Available stores
          </h2>
          <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-300">
            Synced
          </span>
        </div>
        {game.stores.map((store) => (
          <a
            key={store.name}
            href={store.href}
            className="group flex items-center justify-between gap-3 rounded-lg border border-border bg-muted p-3 transition-colors hover:border-primary hover:bg-accent"
          >
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex size-8 shrink-0 items-center justify-center rounded bg-background text-foreground">
                <Gamepad2 className="size-4" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-foreground">
                  {store.name}
                </p>
                <span className="text-[11px] text-muted-foreground">
                  {store.edition}
                </span>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <div className="text-right">
                <p className="text-sm font-bold text-emerald-300">
                  {store.price}
                </p>
                {store.previousPrice && (
                  <p className="text-[10px] text-muted-foreground line-through">
                    {store.previousPrice}
                  </p>
                )}
              </div>
              <ExternalLink
                className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </div>
          </a>
        ))}
      </div>
      <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5 shadow-xl">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
          <Timer className="size-5 text-secondary" aria-hidden="true" />
          Time to beat
        </h2>
        {game.timeToBeat.map((item) => (
          <div key={item.label} className="flex flex-col gap-1.5">
            <div className="flex justify-between gap-3 text-sm">
              <span className="text-foreground">{item.label}</span>
              <span className="font-bold text-secondary">
                {item.hours} hours
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div
                className={`h-full rounded-full ${tones[item.tone]}`}
                style={{ width: `${item.percentage}%` }}
              />
            </div>
          </div>
        ))}
        <div className="flex items-center justify-between gap-3 rounded-lg border border-border bg-muted p-3 text-xs">
          <span className="text-muted-foreground">
            Average backlog completion
          </span>
          <strong className="text-foreground">45.0 hours</strong>
        </div>
      </div>
      <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5 shadow-xl">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
          <Globe className="size-5 text-primary" aria-hidden="true" />
          Game specifications
        </h2>
        <Spec label="Genres" value={game.genres.join(', ')} />
        <Spec label="Themes" value={game.themes.join(', ')} />
        <Spec label="Game modes" value={game.gameModes.join(', ')} />
        <Spec label="Engine" value={game.engine} />
        <Spec label="Checkpoint ID" value={game.checkpointId} />
        <Spec
          label="Official site"
          value={game.officialSite ?? 'Unavailable'}
          link={game.officialSite}
        />
      </div>
      <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5 shadow-xl">
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
            <Users className="size-5 text-secondary" aria-hidden="true" />
            Backlog activity
          </h2>
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
            Active
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          <strong className="text-foreground">
            {game.communityActivity.members.toLocaleString()}
          </strong>{' '}
          members have this game in their catalog.
        </p>
        <div className="grid grid-cols-3 gap-2 text-center">
          {[
            ['Playing', game.communityActivity.playing, 'text-primary'],
            ['Queued', game.communityActivity.queued, 'text-secondary'],
            ['Completed', game.communityActivity.completed, 'text-emerald-300'],
          ].map(([label, value, tone]) => (
            <div
              key={label}
              className="rounded-lg border border-border bg-muted p-2"
            >
              <p className={`text-lg font-bold ${tone}`}>
                {Number(value).toLocaleString()}
              </p>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                {label}
              </p>
            </div>
          ))}
        </div>
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="size-2 rounded-full bg-emerald-400" />
          Avg difficulty:{' '}
          <strong className="text-foreground">
            {game.communityActivity.difficulty}
          </strong>
        </p>
      </div>
    </aside>
  )
}

function Spec({
  label,
  value,
  link,
}: {
  label: string
  value: string
  link?: string
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-border py-2.5 text-sm last:border-0">
      <span className="text-muted-foreground">{label}</span>
      {link ? (
        <a
          href={link}
          className="inline-flex items-center gap-1 text-right font-medium text-primary hover:underline"
        >
          {value}
          <ExternalLink className="size-3" aria-hidden="true" />
        </a>
      ) : (
        <span className="text-right font-medium text-foreground">{value}</span>
      )}
    </div>
  )
}

export { GameDetailsSidebar }
