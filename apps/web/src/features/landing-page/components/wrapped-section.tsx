import { ArrowRight, CheckCircle2, Flame, Share2, Trophy } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function WrappedSection() {
	return (
		<section
			id="community"
			className="relative isolate overflow-hidden px-4 py-20 sm:px-6 lg:px-8 lg:py-28"
		>
			{/* gradient background: crimson -> deep space */}

			<div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
				<div className="text-center lg:text-left">
					<h2 className="text-balance text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl">
						Ready to cross the next checkpoint?
					</h2>
					<p className="mx-auto mt-5 max-w-md text-pretty leading-relaxed text-muted-foreground lg:mx-0">
						Join thousands of players turning their pile of shame into a hall of
						fame. Create your free account and start tracking today.
					</p>
					<div className="mt-8 flex justify-center lg:justify-start">
						<Link
							href="/register"
							className="group inline-flex items-center justify-center gap-2 rounded-xl bg-secondary px-7 py-3.5 text-base font-semibold text-foreground shadow-[0_0_32px_-4px_rgba(193,18,31,0.7)] transition-all hover:bg-primary/80 hover:shadow-[0_0_40px_0px_rgba(255,77,77,0.55)]"
						>
							Create Your Free Account
							<ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
						</Link>
					</div>
				</div>

				{/* mock user profile card */}
				<div className="mx-auto w-full max-w-md">
					<div className="rounded-2xl border border-border bg-card p-6 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.7)]">
						<div className="flex items-center gap-4">
							<div className="flex size-14 items-center justify-center rounded-full bg-primary/15 text-lg font-bold text-primary ring-1 ring-primary/30">
								JT
							</div>
							<div className="min-w-0 flex-1">
								<p className="font-semibold text-foreground">Jordan Tran</p>
								<p className="text-sm text-muted-foreground">@quest_jordan</p>
							</div>
							<span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-bold text-foreground">
								<Trophy className="size-3.5" />
								LVL 42
							</span>
						</div>

						<div className="mt-5 grid grid-cols-3 gap-3">
							{[
								{ label: "Beaten", value: "128" },
								{ label: "Platinums", value: "37" },
								{ label: "Hours", value: "2.4k" },
							].map((stat) => (
								<div
									key={stat.label}
									className="rounded-xl border border-border bg-background/60 p-3 text-center"
								>
									<p className="text-xl font-bold text-foreground">
										{stat.value}
									</p>
									<p className="text-xs text-muted-foreground">{stat.label}</p>
								</div>
							))}
						</div>

						<div className="mt-5 flex items-center gap-3 rounded-xl border border-border bg-background/60 p-3">
							<div className="relative h-14 w-11 shrink-0 overflow-hidden rounded-md">
								<Image
									src="/games/crash-cover.avif"
									alt="Crash Bandicoot 4 cover art"
									fill
									sizes="44px"
									className="object-cover"
								/>
							</div>
							<div className="min-w-0 flex-1">
								<p className="flex items-center gap-1.5 text-xs font-medium text-primary">
									<CheckCircle2 className="size-3.5" />
									Game Completed
								</p>
								<p className="truncate text-sm font-semibold text-foreground">
									Bladesworn
								</p>
								<p className="text-xs text-muted-foreground">
									Platinum unlocked · 64h
								</p>
							</div>
						</div>

						<div className="mt-5 flex items-center justify-between">
							<span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
								<Flame className="size-4 text-primary" />
								18-day streak
							</span>
							<button
								type="button"
								className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
							>
								<Share2 className="size-4" />
								Share Wrapped
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
