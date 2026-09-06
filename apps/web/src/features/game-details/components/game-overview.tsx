import { BookOpen, SlidersHorizontal, Swords, Users } from 'lucide-react'
import type { GameFeature } from '../types'

const featureIcons = {
  swords: Swords,
  users: Users,
  book: BookOpen,
  sliders: SlidersHorizontal,
}

function GameOverview({
  synopsis,
  overview,
  features,
}: {
  synopsis: string
  overview: string
  features: GameFeature[]
}) {
  return (
    <section className="flex flex-col gap-5 rounded-xl border border-border bg-card p-5 sm:p-7">
      <div>
        <span className="text-[10px] font-semibold uppercase tracking-widest text-primary">
          Deep overview
        </span>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight text-foreground">
          About the game
        </h2>
      </div>
      <p className="text-base leading-relaxed text-foreground/90">{synopsis}</p>
      <p className="text-sm leading-relaxed text-muted-foreground">
        {overview}
      </p>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {features.map((feature) => {
          const Icon = featureIcons[feature.icon]
          return (
            <div
              key={feature.title}
              className="flex items-start gap-3 rounded-lg border border-border bg-muted p-4"
            >
              <div className="rounded bg-primary/10 p-2 text-primary">
                <Icon className="size-5" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export { GameOverview }
