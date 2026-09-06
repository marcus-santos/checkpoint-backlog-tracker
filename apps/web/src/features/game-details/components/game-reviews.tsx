'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Clock3, MessageCircle, Send, Star, ThumbsUp } from 'lucide-react'
import { useState } from 'react'
import { canReview, getReviewEligibilityMessage } from '../domain'
import type { GameDetails, UserGameStatus } from '../types'

function Stars({
  value,
  interactive = false,
  onChange,
}: {
  value: number
  interactive?: boolean
  onChange?: (value: number) => void
}) {
  return (
    <div
      className="flex items-center gap-0.5"
      role="radiogroup"
      aria-label={interactive ? 'Your rating' : `${value} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type={interactive ? 'button' : undefined}
          disabled={!interactive}
          onClick={() => onChange?.(star)}
          aria-label={
            interactive ? `${star} star${star === 1 ? '' : 's'}` : undefined
          }
          className={
            interactive
              ? 'rounded-sm p-0.5 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
              : 'cursor-default'
          }
        >
          <Star
            className={`size-4 ${star <= value ? 'fill-amber-300 text-amber-300' : 'text-border'}`}
            aria-hidden="true"
          />
        </button>
      ))}
    </div>
  )
}

function ReviewForm({
  game,
  onSubmit,
}: {
  game: GameDetails
  onSubmit?: (review: {
    rating: number
    status: UserGameStatus
    hours: string
    body: string
    spoiler: boolean
  }) => void
}) {
  const [rating, setRating] = useState(5)
  const [status, setStatus] = useState<UserGameStatus>(game.status)
  const [hours, setHours] = useState(
    game.loggedHours ? `${game.loggedHours} hrs` : ''
  )
  const [body, setBody] = useState('')
  const [spoiler, setSpoiler] = useState(false)

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!canReview(status) || !body.trim()) return
    onSubmit?.({ rating, status, hours, body: body.trim(), spoiler })
    setBody('')
  }

  return (
    <form
      onSubmit={submit}
      className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5 shadow-lg sm:p-6"
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
          <MessageCircle className="size-5 text-primary" aria-hidden="true" />
          Log session & post review
        </h3>
        <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
          Logbook
        </span>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="flex flex-col gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          <span>Your rating</span>
          <Stars value={rating} interactive onChange={setRating} />
        </div>
        <div className="flex flex-col gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          <span>Status</span>
          <Select
            value={status}
            onValueChange={(value) => setStatus(value as UserGameStatus)}
          >
            <SelectTrigger id="review-status" aria-label="Review status">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {(
                [
                  'ongoing',
                  'paused',
                  'dropped',
                  'completed',
                ] as UserGameStatus[]
              ).map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          <label htmlFor="logged-playtime">Logged playtime</label>
          <div className="relative">
            <Input
              id="logged-playtime"
              value={hours}
              onChange={(event) => setHours(event.target.value)}
              placeholder="e.g. 35 hrs"
              className="bg-muted pr-9"
            />
            <Clock3
              className="pointer-events-none absolute right-3 top-2.5 size-4"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        <label htmlFor="review-body">Personal critique & backlog notes</label>
        <textarea
          id="review-body"
          value={body}
          onChange={(event) => setBody(event.target.value)}
          required
          rows={4}
          placeholder="Share your experience with fellow Checkpoint runners..."
          className="resize-none rounded-lg border border-input bg-muted p-3 text-sm font-normal text-foreground outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        />
      </div>
      <div className="flex flex-col justify-between gap-3 pt-1 sm:flex-row sm:items-center">
        <label className="flex items-center gap-2 text-sm text-muted-foreground">
          <input
            type="checkbox"
            checked={spoiler}
            onChange={(event) => setSpoiler(event.target.checked)}
            className="size-4 accent-primary"
          />
          Mark review as spoiler-containing
        </label>
        <Button
          type="submit"
          className="bg-primary font-bold text-primary-foreground hover:bg-primary/80"
        >
          <Send aria-hidden="true" />
          Post log & review
        </Button>
      </div>
    </form>
  )
}

function ReviewGate({ status }: { status: UserGameStatus }) {
  const message = getReviewEligibilityMessage(status)
  if (!message) return null
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <p className="text-sm font-semibold text-foreground">
        Reviews unlock after you play
      </p>
      <p className="mt-1 text-sm text-muted-foreground">{message}</p>
    </div>
  )
}

function ReviewFeed({ game }: { game: GameDetails }) {
  return (
    <div className="flex flex-col gap-4">
      {game.reviews.map((review) => (
        <article
          key={review.id}
          className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-border/90"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-primary/15 text-sm font-bold text-primary">
                {review.initials}
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="truncate text-sm font-semibold text-foreground">
                    {review.author}
                  </h3>
                  <span className="rounded border border-emerald-400/30 bg-emerald-400/15 px-2 py-0.5 text-[10px] font-semibold text-emerald-300">
                    {review.badge}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {review.metadata}
                </p>
              </div>
            </div>
            <Stars value={review.rating} />
          </div>
          <p className="mt-3 text-sm leading-relaxed text-foreground/90">
            {review.body}
          </p>
          <div className="mt-3 flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="px-0 text-muted-foreground hover:text-foreground"
            >
              <ThumbsUp className="size-4 text-emerald-300" />
              {review.helpfulCount} gamers found this helpful
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="px-0 text-muted-foreground hover:text-foreground"
            >
              <MessageCircle className="size-4" />
              {review.replyCount} replies
            </Button>
          </div>
        </article>
      ))}
    </div>
  )
}

function GameReviews({
  game,
  onSubmit,
}: {
  game: GameDetails
  onSubmit?: (review: {
    rating: number
    status: UserGameStatus
    hours: string
    body: string
    spoiler: boolean
  }) => void
}) {
  return (
    <section className="flex flex-col gap-5">
      <div className="flex flex-col justify-between gap-3 border-b border-border pb-3 sm:flex-row sm:items-end">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            User reviews & backlog logs
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Based on {game.completedCount.toLocaleString()} community
            completions and active logs
          </p>
        </div>
        <Select defaultValue="helpful">
          <SelectTrigger className="w-44" aria-label="Sort reviews">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="helpful">Most helpful</SelectItem>
            <SelectItem value="newest">Newest entries</SelectItem>
            <SelectItem value="rated">Highest rated</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col items-center gap-6 rounded-xl border border-border bg-card p-5 md:flex-row">
        <div className="flex w-36 shrink-0 flex-col items-center text-center">
          <span className="text-5xl font-extrabold tracking-tighter text-foreground">
            {game.communityRating.toFixed(1)}
          </span>
          <Stars value={game.communityRating} />
          <span className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            96% recommended
          </span>
        </div>
        <div className="flex w-full flex-col gap-2">
          {game.ratingDistribution.map((rating) => (
            <div
              key={rating.stars}
              className="flex items-center gap-3 text-xs text-muted-foreground"
            >
              <span className="w-8 text-right">{rating.stars} ★</span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-emerald-400"
                  style={{ width: `${rating.percentage}%` }}
                />
              </div>
              <span className="w-10 text-right">{rating.percentage}%</span>
            </div>
          ))}
        </div>
      </div>
      {canReview(game.status) ? (
        <ReviewForm game={game} onSubmit={onSubmit} />
      ) : (
        <ReviewGate status={game.status} />
      )}
      <ReviewFeed game={game} />
    </section>
  )
}

export { GameReviews }
