'use client'

import {
  Bell,
  BookmarkPlus,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Grid2X2,
  List,
  PlayCircle,
  Search,
  SlidersHorizontal,
  Star,
  Timer,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export type CatalogGameStatus =
  | 'available'
  | 'backlog'
  | 'playing'
  | 'wishlist'
  | 'upcoming'

export type CatalogGame = {
  id: number | string
  title: string
  cover: string
  genres: string[]
  platforms: string[]
  rating: number
  releaseYear: number
  status: CatalogGameStatus
  progress?: string
}

type GameCatalogProps = {
  games: CatalogGame[]
  totalCount?: number
  pageSize?: number
  onStatusChange?: (game: CatalogGame, status: CatalogGameStatus) => void
  onPageChange?: (page: number) => void
}

type ViewMode = 'grid' | 'list'

const statusLabels: Record<CatalogGameStatus, string> = {
  available: 'Add to library',
  backlog: 'Start playing',
  playing: 'Log play session',
  wishlist: 'Wishlist',
  upcoming: 'Track release',
}

function GameCatalogFilters({
  search,
  genre,
  platform,
  release,
  sort,
  viewMode,
  onSearchChange,
  onGenreChange,
  onPlatformChange,
  onReleaseChange,
  onSortChange,
  onViewModeChange,
  onQuickFilter,
}: {
  search: string
  genre: string
  platform: string
  release: string
  sort: string
  viewMode: ViewMode
  onSearchChange: (value: string) => void
  onGenreChange: (value: string) => void
  onPlatformChange: (value: string) => void
  onReleaseChange: (value: string) => void
  onSortChange: (value: string) => void
  onViewModeChange: (value: ViewMode) => void
  onQuickFilter: (filter: string) => void
}) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-4 shadow-sm">
      <div className="grid grid-cols-1 items-center gap-3 md:grid-cols-12">
        <div className="relative md:col-span-4">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search by title, series, or creator..."
            aria-label="Search game catalog"
            className="h-10 border-0 bg-muted pl-9 pr-3 text-sm focus-visible:ring-1"
          />
        </div>

        <div className="flex flex-wrap items-center justify-start gap-2 md:col-span-8 md:justify-end">
          <CatalogSelect
            ariaLabel="Filter by genre"
            value={genre}
            onValueChange={onGenreChange}
            placeholder="Genre: All"
            options={['Action', 'RPG', 'Adventure', 'Indie', 'Strategy', 'FPS']}
          />
          <CatalogSelect
            ariaLabel="Filter by platform"
            value={platform}
            onValueChange={onPlatformChange}
            placeholder="Platform: All"
            options={['PC', 'PS5', 'Xbox Series', 'Nintendo Switch']}
          />
          <CatalogSelect
            ariaLabel="Filter by release year"
            value={release}
            onValueChange={onReleaseChange}
            placeholder="Release: Any"
            options={['2024', '2023', '2020 - 2022', 'Classics']}
          />
          <CatalogSelect
            ariaLabel="Sort games by"
            value={sort}
            onValueChange={onSortChange}
            placeholder="Sort: Popularity"
            options={['Release Date', 'Top Rated', 'Most Backlogged']}
          />
          <div className="flex items-center gap-0.5 rounded-lg bg-muted p-1">
            <Button
              type="button"
              size="icon-sm"
              variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
              onClick={() => onViewModeChange('grid')}
              aria-label="Switch to grid view"
            >
              <Grid2X2 aria-hidden="true" />
            </Button>
            <Button
              type="button"
              size="icon-sm"
              variant={viewMode === 'list' ? 'secondary' : 'ghost'}
              onClick={() => onViewModeChange('list')}
              aria-label="Switch to list view"
            >
              <List aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 pt-1">
        <span className="mr-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          Quick filters:
        </span>
        <QuickFilter
          icon={Check}
          label="Hide in-library"
          onClick={() => onQuickFilter('hide-library')}
        />
        <QuickFilter
          icon={Star}
          label="Top rated 85%+"
          onClick={() => onQuickFilter('top-rated')}
        />
        <QuickFilter
          icon={SlidersHorizontal}
          label="Cross-play ready"
          onClick={() => onQuickFilter('cross-play')}
        />
        <QuickFilter
          icon={Timer}
          label="Short (< 10h)"
          onClick={() => onQuickFilter('short')}
        />
      </div>
    </div>
  )
}

function CatalogSelect({
  ariaLabel,
  value,
  onValueChange,
  placeholder,
  options,
}: {
  ariaLabel: string
  value: string
  onValueChange: (value: string) => void
  placeholder: string
  options: string[]
}) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger
        size="sm"
        aria-label={ariaLabel}
        className="border-0 bg-muted text-xs hover:bg-accent"
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">{placeholder}</SelectItem>
        {options.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

function QuickFilter({
  icon: Icon,
  label,
  onClick,
}: {
  icon: typeof Check
  label: string
  onClick: () => void
}) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={onClick}
      className="rounded-full bg-muted text-xs text-foreground hover:bg-accent"
    >
      <Icon className="size-3.5 text-primary" aria-hidden="true" />
      {label}
    </Button>
  )
}

function GameCatalogCard({
  game,
  viewMode,
  onStatusChange,
}: {
  game: CatalogGame
  viewMode: ViewMode
  onStatusChange?: (game: CatalogGame, status: CatalogGameStatus) => void
}) {
  const actionStatus: CatalogGameStatus =
    game.status === 'available' ? 'backlog' : game.status

  const ActionIcon =
    game.status === 'playing'
      ? Clock3
      : game.status === 'wishlist'
        ? Bell
        : game.status === 'upcoming'
          ? CalendarDays
          : game.status === 'backlog'
            ? PlayCircle
            : BookmarkPlus

  return (
    <article
      className={`group flex min-w-0 overflow-hidden rounded-xl border border-transparent bg-card transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl ${
        viewMode === 'list' ? 'flex-row' : 'flex-col'
      }`}
    >
      <div
        className={`relative shrink-0 overflow-hidden bg-muted ${
          viewMode === 'list' ? 'h-32 w-24' : 'aspect-3/4 w-full'
        }`}
      >
        <Image
          src={game.cover}
          alt={`${game.title} cover art`}
          fill
          sizes={
            viewMode === 'list' ? '96px' : '(min-width: 1024px) 22vw, 50vw'
          }
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-full bg-background/95 px-2 py-0.5 text-xs font-semibold text-amber-300">
          <Star className="size-3 fill-current" aria-hidden="true" />
          {game.rating.toFixed(1)}
        </span>
        <span className="absolute left-2 top-2 max-w-[calc(100%-4rem)] truncate rounded bg-background/95 px-2 py-0.5 text-[10px] font-semibold text-foreground">
          {game.genres.join(' • ')}
        </span>
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-between gap-3 p-3 sm:p-4">
        <div className="min-w-0">
          <Link
            href={`/discovery/${game.id}`}
            className="block truncate text-sm font-semibold text-foreground transition-colors hover:text-primary"
          >
            {game.title}
          </Link>
          <p className="mt-0.5 truncate text-xs text-muted-foreground">
            {game.platforms.join(', ')}
          </p>
          {game.progress && (
            <p className="mt-1 text-xs text-primary">{game.progress}</p>
          )}
        </div>
        <Button
          type="button"
          variant={game.status === 'playing' ? 'secondary' : 'ghost'}
          onClick={() => onStatusChange?.(game, actionStatus)}
          className="h-9 w-full justify-between rounded-lg bg-muted px-3 text-xs text-foreground hover:bg-accent"
        >
          <span className="flex items-center gap-1.5">
            <ActionIcon className="size-4 text-primary" aria-hidden="true" />
            {statusLabels[game.status]}
          </span>
          <span aria-hidden="true">
            {game.status === 'playing' ? <Check /> : '>'}
          </span>
        </Button>
      </div>
    </article>
  )
}

function GameCatalog({
  games,
  totalCount,
  pageSize = 8,
  onStatusChange,
  onPageChange,
}: GameCatalogProps) {
  const [search, setSearch] = useState('')
  const [genre, setGenre] = useState('all')
  const [platform, setPlatform] = useState('all')
  const [release, setRelease] = useState('all')
  const [sort, setSort] = useState('all')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [page, setPage] = useState(1)

  const filteredGames = useMemo(() => {
    const normalizedSearch = search.toLowerCase().trim()
    const result = games.filter((game) => {
      const matchesSearch =
        !normalizedSearch ||
        game.title.toLowerCase().includes(normalizedSearch) ||
        game.genres.some((item) =>
          item.toLowerCase().includes(normalizedSearch)
        )
      const matchesGenre = genre === 'all' || game.genres.includes(genre)
      const matchesPlatform =
        platform === 'all' || game.platforms.includes(platform)
      const matchesRelease =
        release === 'all' ||
        (release === '2020 - 2022' &&
          game.releaseYear >= 2020 &&
          game.releaseYear <= 2022) ||
        (release === 'Classics' && game.releaseYear < 2015) ||
        String(game.releaseYear) === release

      return matchesSearch && matchesGenre && matchesPlatform && matchesRelease
    })

    return [...result].sort((first, second) => {
      if (sort === 'Top Rated') return second.rating - first.rating
      if (sort === 'Release Date') return second.releaseYear - first.releaseYear
      return 0
    })
  }, [games, genre, platform, release, search, sort])

  const pageCount = Math.max(1, Math.ceil(filteredGames.length / pageSize))
  const visibleGames = filteredGames.slice(
    (page - 1) * pageSize,
    page * pageSize
  )
  const setFilter = (setter: (value: string) => void, value: string) => {
    setter(value)
    setPage(1)
  }
  const changePage = (nextPage: number) => {
    const safePage = Math.min(Math.max(nextPage, 1), pageCount)
    setPage(safePage)
    onPageChange?.(safePage)
  }

  return (
    <section aria-labelledby="catalog-heading" className="flex flex-col gap-5">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <h2
            id="catalog-heading"
            className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl"
          >
            Explore all games
          </h2>
          <span className="rounded-full bg-muted px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            {(totalCount ?? games.length).toLocaleString()} games available
          </span>
        </div>
      </div>

      <GameCatalogFilters
        search={search}
        genre={genre}
        platform={platform}
        release={release}
        sort={sort}
        viewMode={viewMode}
        onSearchChange={(value) => setFilter(setSearch, value)}
        onGenreChange={(value) => setFilter(setGenre, value)}
        onPlatformChange={(value) => setFilter(setPlatform, value)}
        onReleaseChange={(value) => setFilter(setRelease, value)}
        onSortChange={(value) => setFilter(setSort, value)}
        onViewModeChange={setViewMode}
        onQuickFilter={() => setPage(1)}
      />

      <div
        className={
          viewMode === 'grid'
            ? 'grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
            : 'flex flex-col gap-3'
        }
      >
        {visibleGames.map((game) => (
          <GameCatalogCard
            key={game.id}
            game={game}
            viewMode={viewMode}
            onStatusChange={onStatusChange}
          />
        ))}
      </div>

      <div className="flex flex-col items-center justify-between gap-4 rounded-xl border border-border bg-card p-4 sm:flex-row">
        <p className="order-2 text-sm text-muted-foreground sm:order-1">
          Showing{' '}
          <span className="font-semibold text-foreground">
            {visibleGames.length ? (page - 1) * pageSize + 1 : 0} -{' '}
            {Math.min(page * pageSize, filteredGames.length)}
          </span>{' '}
          of{' '}
          <span className="font-semibold text-foreground">
            {filteredGames.length}
          </span>{' '}
          games
        </p>
        <nav
          aria-label="Catalog pagination"
          className="order-1 flex items-center gap-1 sm:order-2"
        >
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            disabled={page === 1}
            onClick={() => changePage(page - 1)}
            aria-label="Previous page"
          >
            <ChevronLeft aria-hidden="true" />
          </Button>
          {Array.from(
            { length: Math.min(pageCount, 4) },
            (_, index) => index + 1
          ).map((pageNumber) => (
            <Button
              key={pageNumber}
              type="button"
              size="icon-sm"
              variant={page === pageNumber ? 'default' : 'ghost'}
              onClick={() => changePage(pageNumber)}
              aria-current={page === pageNumber ? 'page' : undefined}
            >
              {pageNumber}
            </Button>
          ))}
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            disabled={page === pageCount}
            onClick={() => changePage(page + 1)}
            aria-label="Next page"
          >
            <ChevronRight aria-hidden="true" />
          </Button>
        </nav>
      </div>
    </section>
  )
}

export { GameCatalog }
