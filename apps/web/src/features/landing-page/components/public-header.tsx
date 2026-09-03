import { CheckpointLogo } from "@/components/ui/checkpoint-logo";
import Link from "next/link";

const navLinks = [
	{ label: "Features", href: "#features" },
	{ label: "Community", href: "#community" },
	{ label: "FAQ", href: "#faq" },
];

export function PublicHeader() {
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
				<div>
					<Link
						href="/login"
						className="inline-flex items-center justify-center px-6 py-2 text-sm font-semibold hover:text-primary transition"
					>
						Login
					</Link>
					<Link
						href="/register"
						className="inline-flex items-center justify-center rounded-lg bg-secondary px-4 py-2 text-sm font-semibold text-foreground shadow-[0_0_20px_-2px_rgba(193,18,31,0.6)] transition-all hover:bg-primary/80 hover:shadow-[0_0_28px_0px_rgba(255,77,77,0.55)]"
					>
						Get Started
					</Link>
				</div>
			</div>
		</header>
	);
}
