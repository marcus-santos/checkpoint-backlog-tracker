import Image from "next/image";
import type { ReactNode } from "react";
import { FaPlaystation, FaSteam, FaXbox } from "react-icons/fa";

type PlatformCard = {
	label: string;
	icon: ReactNode;
	spanClassName?: string;
};

const platformCards: PlatformCard[] = [
	{
		label: "PlayStation",
		icon: <FaPlaystation className="size-8" />,
	},
	{
		label: "Xbox Network",
		icon: <FaXbox className="size-8" />,
	},
	{
		label: "Steam PC",
		icon: <FaSteam className="size-8" />,
	},
	{
		label: "GOG Galaxy",
		icon: (
			<Image
				src="/GOG.com_logo.svg"
				alt="GOG.com Logo"
				width={32}
				height={32}
				className="brightness-0 invert opacity-90"
			/>
		),
	},
	{
		label: "RetroAchievements",
		icon: (
			<Image
				src="/RetroAchievements_logo.svg"
				alt="RetroAchievements Logo"
				width={36}
				height={36}
				className="brightness-0 invert opacity-90"
			/>
		),
		spanClassName: "col-span-2 md:col-span-1",
	},
] as const;

export function PlatformsSection() {
	return (
		<section className="my-24 max-w-5xl mx-auto px-4 text-center">
			<h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-3">
				Connected Ecosystem
			</h3>
			<h2 className="text-3xl font-extrabold text-foreground mb-4">
				Play anywhere. Organize here.
			</h2>
			<p className="text-base text-muted-foreground max-w-xl mx-auto mb-12">
				Support for automatic imports, profile syncing, or manual tracking for
				all major gaming platforms on the market.
			</p>

			<div className="grid grid-cols-2 md:grid-cols-5 gap-4">
				{platformCards.map((platform) => (
					<div
						key={platform.label}
						className={`bg-card border border-border hover:border-primary rounded-xl p-6 flex flex-col items-center justify-center gap-3 transition-all duration-300 group hover:shadow-[0_0_20px_rgba(255,77,77,0.55)] ${platform.spanClassName ?? ""}`}
					>
						{platform.icon}
						<span className="text-sm font-bold text-[#F2F2F2]/50 group-hover:text-[#F2F2F2] transition-colors">
							{platform.label}
						</span>
					</div>
				))}
			</div>
		</section>
	);
}
