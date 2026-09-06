'use client'

import {
  ArrowLeft,
  ArrowRight,
  Clock3,
  Gamepad2,
  ListPlus,
  Sparkles,
  Star,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

export type TrendingGame = {
  id: number | string
  title: string
  cover: string
  developer: string
  releaseYear: number
  genres: string[]
  platforms: string[]
  rating: number
  ratingCount: string
  timeToBeat: string
  matchPercentage: number
  flavor: string
  statusLabel?: string
}

type RecommendationCarouselProps = {
  games: TrendingGame[]
  onAddToBacklog?: (game: TrendingGame) => void
  onMarkAsPlaying?: (game: TrendingGame) => void
  onSelect?: (game: TrendingGame) => void
}

function RecommendationCarousel({
  games,
  onAddToBacklog,
  onMarkAsPlaying,
  onSelect,
}: RecommendationCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  if (games.length === 0) {
    return null
  }

  const activeGame = games[activeIndex % games.length]
  const previewGames = games
    .filter((_, index) => index !== activeIndex)
    .slice(0, 2)

  const move = (direction: number) => {
    setActiveIndex(
      (currentIndex) => (currentIndex + direction + games.length) % games.length
    )
  }

  return (
    <section aria-labelledby="trending-heading" className="flex flex-col gap-4">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div className="flex flex-wrap items-center gap-3">
          <h1
            id="trending-heading"
            className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl"
          >
            Recommended for you
          </h1>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary">
            <span className="size-1.5 animate-pulse rounded-full bg-primary" />
            {activeGame.flavor}
          </span>
        </div>

        <div className="flex shrink-0 items-center gap-1.5 self-end sm:self-auto">
          <div className="mr-2 flex items-center gap-1.5">
            {games.slice(0, Math.min(games.length, 4)).map((game, index) => (
              <span
                key={game.id}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === activeIndex ? 'w-6 bg-primary' : 'w-1.5 bg-muted'
                }`}
              />
            ))}
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={() => move(-1)}
            aria-label="Previous recommendation"
            className="bg-card text-muted-foreground hover:bg-accent hover:text-foreground"
          >
            <ArrowLeft aria-hidden="true" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={() => move(1)}
            aria-label="Next recommendation"
            className="bg-card text-muted-foreground hover:bg-accent hover:text-foreground"
          >
            <ArrowRight aria-hidden="true" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <article className="group relative isolate flex min-h-125 flex-col justify-end overflow-hidden rounded-xl border border-border bg-card shadow-2xl lg:col-span-9">
          <Image
            src={activeGame.cover}
            alt={`${activeGame.title} cover art`}
            fill
            priority
            sizes="(min-width: 1024px) 75vw, 100vw"
            className="-z-20 object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 -z-10 bg-linear-to-t from-background via-background/80 to-background/10" />
          <div className="absolute inset-0 -z-10 bg-linear-to-r from-background/90 via-background/40 to-transparent" />

          <div className="relative z-10 flex max-w-2xl flex-col gap-4 p-5 sm:p-8">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-300">
                <Sparkles className="size-3.5" aria-hidden="true" />
                {activeGame.matchPercentage}% match
              </span>
              <span className="rounded-md bg-background/95 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                {activeGame.releaseYear} release
              </span>
              <span className="text-sm text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground">
                {activeGame.developer}
              </span>
            </div>

            <Link
              href={`/discovery/${activeGame.id}`}
              className="text-3xl font-bold leading-tight tracking-tight text-foreground transition-colors hover:text-primary sm:text-4xl"
            >
              {activeGame.title}
            </Link>

            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              {activeGame.genres.map((genre) => (
                <span
                  key={genre}
                  className="rounded bg-accent px-2 py-1 text-foreground"
                >
                  {genre}
                </span>
              ))}
              <span className="font-bold text-muted-foreground">•</span>
              <span className="flex items-center gap-1 font-semibold text-amber-300">
                <Star className="size-3.5 fill-current" aria-hidden="true" />
                {activeGame.rating.toFixed(1)}
              </span>
              <span>({activeGame.ratingCount} ratings)</span>
              <span className="font-bold text-muted-foreground">•</span>
              <span className="flex items-center gap-1">
                <Clock3 className="size-3.5" aria-hidden="true" />
                {activeGame.timeToBeat}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="mr-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Platforms
              </span>
              {activeGame.platforms.map((platform) => (
                <span
                  key={platform}
                  className="rounded-md bg-muted/90 px-2 py-1 text-[10px] font-semibold text-foreground"
                >
                  {platform}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <Button
                type="button"
                onClick={() => onAddToBacklog?.(activeGame)}
                className="rounded-lg bg-primary px-4 font-semibold text-primary-foreground shadow-[0_0_20px_-4px_rgba(255,77,77,0.4)] hover:bg-primary/80"
              >
                <ListPlus aria-hidden="true" />
                Add to backlog
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => onMarkAsPlaying?.(activeGame)}
                className="rounded-lg border-border bg-card/90 text-foreground hover:bg-accent"
              >
                <Gamepad2 aria-hidden="true" />
                Mark as playing
              </Button>
            </div>
          </div>
        </article>

        <div className="flex flex-col gap-4 lg:col-span-3">
          {previewGames.map((game, index) => (
            <button
              key={game.id}
              type="button"
              onClick={() => {
                const nextIndex = games.findIndex((item) => item.id === game.id)
                setActiveIndex(nextIndex)
                onSelect?.(game)
              }}
              className="group relative flex min-h-36 flex-1 flex-col justify-between overflow-hidden rounded-xl border border-border bg-card p-4 text-left transition-colors hover:border-primary/40 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Image
                src={game.cover}
                alt=""
                fill
                sizes="(min-width: 1024px) 25vw, 100vw"
                className="object-cover opacity-20 transition-opacity group-hover:opacity-30"
              />
              <div className="absolute inset-0 bg-linear-to-b from-card/40 via-card/70 to-card" />
              <div className="relative z-10 flex items-start justify-between">
                <span className="rounded-full bg-emerald-400/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-300">
                  {game.matchPercentage}% match
                </span>
                <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground" />
              </div>
              <div className="relative z-10 pt-5">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-primary">
                  {game.statusLabel ?? (index === 0 ? 'Next up' : 'Trending')}
                </p>
                <h3 className="truncate text-sm font-semibold text-foreground group-hover:text-primary">
                  {game.title}
                </h3>
                <p className="mt-0.5 truncate text-xs text-muted-foreground">
                  {game.developer} • {game.platforms.join(', ')}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export { RecommendationCarousel }
