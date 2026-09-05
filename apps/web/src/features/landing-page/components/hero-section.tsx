import { ArrowRight, Trophy } from 'lucide-react'
import Link from 'next/link'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 pt-36 pb-16 sm:px-6 lg:px-8 lg:pt-44">
      <div className="mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium text-muted-foreground">
          <Trophy className="size-3.5 text-primary" />
          Your backlog, finally under control
        </span>

        <h1 className="mt-6 text-balance text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Conquer Your Pile of Shame.{' '}
          <span className="text-primary">Track Your Journey.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
          The ultimate dashboard to sync your games, track your hours, level up
          your gaming stats, and finally clear your backlog.
        </p>

        <div className="mt-9 flex items-center justify-center">
          <Link
            href="/login"
            className="group inline-flex items-center justify-center gap-2 rounded-xl bg-secondary px-7 py-3.5 text-base font-semibold text-foreground shadow-[0_0_32px_-4px_rgba(193,18,31,0.7)] transition-all hover:bg-primary/80 hover:shadow-[0_0_40px_0px_rgba(255,77,77,0.55)]"
          >
            Start Your Quest — It&apos;s Free
            <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  )
}
