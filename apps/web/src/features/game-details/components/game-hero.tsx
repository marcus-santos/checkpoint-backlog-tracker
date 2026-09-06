'use client'

import { ChevronDown, Heart, Library, Share2, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { userGameStatusLabels } from '../domain'
import type { GameDetails, UserGameStatus } from '../types'

type GameHeroProps = {
  game: GameDetails
  onStatusChange?: (status: UserGameStatus) => void
  onFavoriteChange?: (favorite: boolean) => void
}

function GameHero({ game, onStatusChange, onFavoriteChange }: GameHeroProps) {
  const [favorite, setFavorite] = useState(false)

  function toggleFavorite() {
    const nextFavorite = !favorite
    setFavorite(nextFavorite)
    onFavoriteChange?.(nextFavorite)
  }

  return (
    <section className="relative overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0 h-130 overflow-hidden md:h-145">
        <Image
          src={game.backdrop}
          alt=""
          fill
          priority
          className="scale-105 object-cover opacity-30 grayscale"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-r from-background via-background/60 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-12 pt-8 sm:px-6 lg:px-8">
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex items-center gap-2 overflow-hidden text-xs text-muted-foreground"
        >
          <Link href="/" className="shrink-0 hover:text-foreground">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <Link href="/discovery" className="shrink-0 hover:text-foreground">
            Discovery
          </Link>
          <span aria-hidden="true">/</span>
          <span className="truncate text-foreground">{game.title}</span>
        </nav>

        <div className="flex flex-col items-start gap-8 lg:flex-row lg:gap-10">
          <div className="group relative aspect-3/4 w-52 shrink-0 overflow-hidden rounded-xl border border-border bg-card shadow-2xl sm:w-64">
            <Image
              src={game.cover}
              alt={`${game.title} cover`}
              fill
              sizes="(min-width: 640px) 256px, 208px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute right-3 top-3 rounded bg-background/95 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-300">
              Verified
            </span>
          </div>

          <div className="flex min-w-0 flex-1 flex-col justify-between self-stretch">
            <div>
              <div className="mb-3 flex flex-wrap items-center gap-2">
                {game.platforms.map((platform) => (
                  <span
                    key={platform}
                    className="rounded-full border border-border bg-card/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-foreground"
                  >
                    {platform}
                  </span>
                ))}
                <span className="rounded-full border border-secondary/30 bg-secondary/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-secondary">
                  {game.genres[0]}
                </span>
              </div>
              <h1 className="text-4xl font-bold leading-none tracking-tight text-foreground sm:text-5xl">
                {game.title}
              </h1>
              <p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
                <span>
                  Developed by{' '}
                  <strong className="text-foreground">{game.developer}</strong>
                </span>
                <span>•</span>
                <span>
                  Published by{' '}
                  <strong className="text-foreground">{game.publisher}</strong>
                </span>
                <span>•</span>
                <span>{game.releaseDate}</span>
                <span>•</span>
                <span className="rounded bg-muted px-1.5 py-0.5 text-xs font-bold text-foreground">
                  {game.certification}
                </span>
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 rounded-lg border border-emerald-400/30 bg-card px-3 py-2 text-emerald-300">
                  <span className="text-2xl font-bold">{game.igdbScore}</span>
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                    Score
                  </span>
                  <span className="hidden text-xs font-semibold text-foreground sm:inline">
                    {game.scoreLabel}
                  </span>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2">
                  <Star
                    className="size-5 fill-amber-300 text-amber-300"
                    aria-hidden="true"
                  />
                  <span className="text-xl font-bold text-foreground">
                    {game.communityRating.toFixed(1)}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    ({game.reviewCount.toLocaleString()} reviews)
                  </span>
                </div>
                {game.loggedHours > 0 && (
                  <span className="rounded-lg border border-primary/30 bg-primary/10 px-3 py-2 text-xs font-semibold text-primary">
                    Currently playing • {game.loggedHours} hrs logged
                  </span>
                )}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              <Button
                type="button"
                onClick={() => onStatusChange?.('ongoing')}
                className="rounded-lg bg-primary px-5 font-bold text-primary-foreground shadow-[0_0_20px_-4px_rgba(255,77,77,0.4)] hover:bg-primary/80"
              >
                <Library aria-hidden="true" />
                Track game
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    type="button"
                    size="icon-lg"
                    className="rounded-lg bg-primary/80 text-primary-foreground hover:bg-primary"
                    aria-label="Change tracking status"
                  >
                    <ChevronDown aria-hidden="true" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  {(Object.keys(userGameStatusLabels) as UserGameStatus[]).map(
                    (status) => (
                      <DropdownMenuItem
                        key={status}
                        onClick={() => onStatusChange?.(status)}
                      >
                        {userGameStatusLabels[status]}
                      </DropdownMenuItem>
                    )
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                type="button"
                variant="outline"
                size="icon-lg"
                onClick={toggleFavorite}
                aria-label={favorite ? 'Remove favorite' : 'Add favorite'}
                className={
                  favorite
                    ? 'border-primary text-primary'
                    : 'border-border bg-card text-muted-foreground'
                }
              >
                <Heart
                  className={favorite ? 'fill-current' : ''}
                  aria-hidden="true"
                />
              </Button>
              <Button
                type="button"
                variant="outline"
                className="rounded-lg border-border bg-card text-foreground hover:border-primary"
              >
                <BookmarkPlusIcon />
                Add to custom list
              </Button>
              <Button
                type="button"
                variant="outline"
                size="icon-lg"
                aria-label="Share game"
                className="border-border bg-card text-muted-foreground"
              >
                <Share2 aria-hidden="true" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function BookmarkPlusIcon() {
  return (
    <span aria-hidden="true" className="text-lg">
      +
    </span>
  )
}

export { GameHero }
