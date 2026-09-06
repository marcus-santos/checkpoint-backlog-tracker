'use client'

import { Maximize2, Play, Settings, Video, Volume2 } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import type { GameMedia } from '../types'

function GameMediaShowcase({ media }: { media: GameMedia[] }) {
  const [activeMediaId, setActiveMediaId] = useState(media[0]?.id)
  const activeMedia =
    media.find((item) => item.id === activeMediaId) ?? media[0]

  if (!activeMedia) return null

  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
          <Video className="size-5 text-primary" aria-hidden="true" />
          Official media & gameplay
        </h2>
        <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
          4K 60FPS HDR
        </span>
      </div>
      <div className="group relative aspect-video overflow-hidden rounded-xl border border-border bg-muted shadow-xl">
        <Image
          src={activeMedia.image}
          alt={activeMedia.title}
          fill
          sizes="(min-width: 1024px) 66vw, 100vw"
          className="object-cover brightness-75 transition-transform duration-500 group-hover:scale-[1.01]"
        />
        <div className="absolute inset-0 flex flex-col justify-between bg-linear-to-t from-background/95 via-transparent to-black/30 p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <span className="rounded-md border border-border bg-background/95 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-foreground">
              {activeMedia.type === 'trailer'
                ? 'Official cinematic trailer'
                : 'Gameplay still'}
            </span>
            <span className="rounded bg-secondary px-2 py-0.5 text-[10px] font-bold text-secondary-foreground">
              LIVE
            </span>
          </div>
          <Button
            type="button"
            size="icon-lg"
            aria-label={`Play ${activeMedia.title}`}
            className="size-16 self-center rounded-full bg-primary/90 text-primary-foreground shadow-[0_0_25px_rgba(255,77,77,0.6)] hover:scale-110 hover:bg-primary"
          >
            <Play className="fill-current" aria-hidden="true" />
          </Button>
          <div className="flex items-center gap-3 text-xs text-foreground">
            <Volume2 className="size-4" aria-hidden="true" />
            <span>0:48 / {activeMedia.duration ?? 'STILL'}</span>
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted/80">
              <div className="h-full w-[29%] bg-primary" />
            </div>
            <Settings
              className="size-4 text-muted-foreground"
              aria-hidden="true"
            />
            <Maximize2
              className="size-4 text-muted-foreground"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        {media.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveMediaId(item.id)}
            aria-label={`Select ${item.title}`}
            className={`group relative aspect-video overflow-hidden rounded-lg border-2 ${item.id === activeMediaId ? 'border-primary shadow-[0_0_12px_rgba(255,77,77,0.3)]' : 'border-border opacity-70 hover:border-primary/60 hover:opacity-100'}`}
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes="25vw"
              className="object-cover"
            />
            {item.duration && (
              <span className="absolute bottom-1 right-1 rounded bg-background/80 px-1 text-[10px] font-mono text-foreground">
                {item.duration}
              </span>
            )}
          </button>
        ))}
      </div>
    </section>
  )
}

export { GameMediaShowcase }
