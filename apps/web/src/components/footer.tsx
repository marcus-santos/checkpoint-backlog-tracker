import { CheckpointLogo } from './ui/checkpoint-logo'

export function SiteFooter() {
  return (
    <footer className="w-full border-t mt-12 border-border py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between px-6 gap-4 sm:flex-row">
        <div className="flex items-center gap-2.5">
          <CheckpointLogo size="text-sm" />
        </div>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Checkpoint. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
