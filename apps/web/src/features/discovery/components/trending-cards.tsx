'use client'

import { Plus, Star, TrendingUp } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export type TrendingCardGame = {
  id: number | string
  title: string
  cover: string
  releaseYear: number
  platforms: string
  rating: number
  weeklyLogCount: string
}

type TrendingCardsProps = {
  games: TrendingCardGame[]
  totalCount?: number
  onQuickAdd?: (game: TrendingCardGame) => void
  onSeeAll?: () => void
}

function TrendingCards({
  games,
  totalCount,
  onQuickAdd,
  onSeeAll,
}: TrendingCardsProps) {
  if (games.length === 0) {
    return null
  }

  return (
    <section aria-labelledby="trending-heading" className="flex flex-col gap-4">
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span
              className="size-2 rounded-full bg-primary"
              aria-hidden="true"
            />
            <h2
              id="trending-heading"
              className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl"
            >
              Trending now / In the spotlight
            </h2>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            What the Checkpoint gaming community is active in this week
          </p>
        </div>

        <Button
          type="button"
          variant="link"
          onClick={onSeeAll}
          className="shrink-0 gap-1 px-0 text-sm text-secondary hover:text-foreground"
        >
          See all ({totalCount ?? games.length})
          <span aria-hidden="true">-&gt;</span>
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 lg:gap-5">
        {games.map((game) => (
          <article
            key={game.id}
            className="group relative flex min-w-0 flex-col overflow-hidden rounded-xl border border-transparent bg-card transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_0_20px_-4px_rgba(255,77,77,0.3)]"
          >
            <div className="relative aspect-3/4 overflow-hidden bg-muted">
              <Image
                src={game.cover}
                alt={`${game.title} cover art`}
                fill
                sizes="(min-width: 1024px) 16vw, (min-width: 768px) 25vw, 50vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <span className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-full bg-background/95 px-2 py-0.5 text-xs font-semibold text-amber-300">
                <Star className="size-3 fill-current" aria-hidden="true" />
                {game.rating.toFixed(1)}
              </span>
              <Button
                type="button"
                size="icon-sm"
                onClick={() => onQuickAdd?.(game)}
                aria-label={`Quick add ${game.title} to backlog`}
                title={`Quick add ${game.title} to backlog`}
                className="absolute bottom-2 right-2 size-8 rounded-full bg-primary text-primary-foreground opacity-0 shadow-lg transition-all group-hover:opacity-100 hover:scale-110 hover:bg-primary/80 focus-visible:opacity-100"
              >
                <Plus aria-hidden="true" />
              </Button>
            </div>

            <div className="flex min-h-25 flex-1 flex-col justify-between gap-1 p-2 sm:p-3">
              <div className="min-w-0">
                <Link
                  href={`/discovery/${game.id}`}
                  className="block truncate text-sm font-semibold text-foreground transition-colors hover:text-primary"
                >
                  {game.title}
                </Link>
                <p className="truncate text-xs text-muted-foreground">
                  {game.releaseYear} • {game.platforms}
                </p>
              </div>
              <div className="flex items-center gap-1 pt-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-300">
                <TrendingUp className="size-3.5" aria-hidden="true" />
                <span>{game.weeklyLogCount} logging</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export { TrendingCards }
