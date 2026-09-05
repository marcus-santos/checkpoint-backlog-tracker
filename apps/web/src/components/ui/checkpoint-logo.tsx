import { PiTargetBold } from 'react-icons/pi'

interface CheckpointLogoProps {
  size: string
}

export function CheckpointLogo({ size }: CheckpointLogoProps) {
  return (
    <span
      className={`inline-flex text-secondary items-center font-extrabold tracking-tight ${size}`}
    >
      Check<span className="text-foreground">p</span>
      <PiTargetBold className="mt-0.5" />
      <span className="text-foreground">int</span>
    </span>
  )
}
