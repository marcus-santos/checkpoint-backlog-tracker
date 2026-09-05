import type { LucideIcon } from 'lucide-react'
import { Award, Clock, RefreshCw } from 'lucide-react'

type Feature = {
  icon: LucideIcon
  title: string
  description: string
}

const features: Feature[] = [
  {
    icon: RefreshCw,
    title: 'Multiplatform Library',
    description:
      'Connect your favorite gaming profiles or curate your collection manually. Checkpoint centralizes your PC, console, and retro games into a single, clean, and intelligent dashboard.',
  },
  {
    icon: Clock,
    title: 'Time-to-Beat Metrics',
    description:
      'Instantly see how many hours each game in your queue demands for completion. Plan your gaming week efficiently and never feel overwhelmed by an endless list again.',
  },
  {
    icon: Award,
    title: 'Level Up Your Journey',
    description:
      'Turn your gaming routine into an actual campaign. Earn XP as you finish titles, unlock platform-exclusive badges, and share beautiful, dynamic stats with your friends.',
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Everything you need to clear the queue
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-pretty leading-relaxed text-muted-foreground">
          Checkpoint turns your scattered library into a focused, rewarding
          journey from backlog to platinum.
        </p>
      </div>

      <div className="mx-auto mt-14 grid max-w-6xl gap-6 md:grid-cols-3">
        {features.map((feature) => (
          <article
            key={feature.title}
            className="group rounded-2xl border border-border bg-card p-7 transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_28px_-8px_rgba(255,77,77,0.5)]"
          >
            <span
              className={`flex size-12 items-center justify-center rounded-xl transition-colors group-hover:bg-primary group-hover:text-foreground ${'bg-primary/15 text-primary ring-1 ring-primary/30'}`}
            >
              <feature.icon className="size-6" />
            </span>
            <h3 className="mt-5 text-xl font-semibold text-foreground">
              {feature.title}
            </h3>
            <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
              {feature.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
