import Image from 'next/image'
import Link from 'next/link'
import { BiBell } from 'react-icons/bi'
import { IoSearch } from 'react-icons/io5'
import { CheckpointLogo } from '@/components/ui/checkpoint-logo'
import { Button } from './ui/button'

const navLinks = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'My Library', href: '/my-library' },
  { label: 'Community', href: '/community' },
  { label: 'Game Catalog', href: '/game-catalog' },
]

export function PrivateHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/60 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2.5">
          <CheckpointLogo size="text-xl" />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button className="items-center justify-center rounded-xl py-2 px-3 bg-card text-muted-foreground text-sm hover:text-foreground hover:bg-primary/70 transition cursor-pointer">
            <IoSearch />
          </Button>
          <Button className="items-center justify-center rounded-xl py-2 px-3 bg-card text-muted-foreground text-sm hover:text-foreground hover:bg-primary/70 transition cursor-pointer">
            <BiBell />
          </Button>
          <Button className="items-center justify-center rounded-full size-9 border-primary/80 border-2 bg-card text-muted-foreground text-sm hover:bg-background hover:scale-105 transition cursor-pointer">
            <Image
              src="/profile.jpg"
              alt="profile picture"
              width={32}
              height={32}
              className="object-cover size-8 absolute rounded-full"
            />
          </Button>
        </div>
      </div>
    </header>
  )
}
