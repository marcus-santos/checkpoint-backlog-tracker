import Image from "next/image";

const rowOne = [
	{ src: "/games/alan-wake-cover.avif", title: "Alan Wake 2" },
	{ src: "/games/avowed-cover.jpeg", title: "Avowed" },
	{ src: "/games/forza-cover.jpeg", title: "Forza Horizon 6" },
	{ src: "/games/gow-cover.jpeg", title: "God of War" },
	{ src: "/games/lies-of-p-cover.avif", title: "Lies of P" },
	{ src: "/games/batman-cover.avif", title: "Batman Arkham Knight" },
	{ src: "/games/crash-cover.avif", title: "Crash Bandicoot 4" },
	{ src: "/games/ds3-cover.webp", title: "Dark Souls III" },
	{ src: "/games/hollow-cover.avif", title: "Hollow Knight Silksong" },
	{ src: "/games/lego-cover.webp", title: "Lego Marvel SuperHeroes" },
];

const rowTwo = [
	{ src: "/games/borderlands.jpeg", title: "Borderlands 3" },
	{ src: "/games/dbz.avif", title: "Dragon Ball Z Kakarot" },
	{ src: "/games/deadspace.jpeg", title: "Deadspace" },
	{ src: "/games/dmc5.jpeg", title: "Devil May Cry 5" },
	{ src: "/games/overcooked.webp", title: "Overcooked 2" },
	{ src: "/games/re9-cover.avif", title: "Resident Evil 9" },
	{ src: "/games/runescape-cover.avif", title: "Runescape Dragonwilds" },
	{ src: "/games/sifu-cover.avif", title: "Sifu" },
	{ src: "/games/star-wars-cover.webp", title: "Star Wars Fallen Order" },
];

function GameCard({ src, title }: { src: string; title: string }) {
	return (
		<div className="group relative aspect-3/4 w-44 shrink-0 overflow-hidden rounded-xl border border-card bg-card transition-all duration-300 hover:border-primary hover:shadow-[0_0_24px_-4px_rgba(255,77,77,0.6)] sm:w-52">
			<Image
				src={src || "/placeholder.svg"}
				alt={`${title} cover art`}
				fill
				sizes="(max-width: 640px) 176px, 208px"
				className="object-cover transition-transform duration-500 hover:scale-105"
			/>
			<div className="absolute inset-0 from-background/85 via-background/10 to-transparent transition-opacity duration-300 group-hover:from-background/60" />
			<div className="absolute inset-x-0 bottom-0 p-3">
				<p className="text-sm font-semibold text-foreground">{title}</p>
			</div>
		</div>
	);
}

function CarrouselRow({
	items,
	direction,
}: {
	items: { src: string; title: string }[];
	direction: "left" | "right";
}) {
	const doubled = [...items, ...items, ...items, ...items];
	return (
		<div className="group flex overflow-hidden">
			<div
				className={`flex shrink-0 gap-4 pr-4 ${
					direction === "left"
						? "animate-marquee-left"
						: "animate-marquee-right"
				} `}
			>
				{doubled.map((item, i) => (
					<GameCard
						key={`${item.title}-${
							// biome-ignore lint/suspicious/noArrayIndexKey: <any>
							i
						}`}
						{...item}
					/>
				))}
			</div>
		</div>
	);
}

export function GameCarrousel() {
	return (
		<section className="relative isolate overflow-hidden py-10">
			{/* edge fades */}
			<div
				aria-hidden="true"
				className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-linear-to-r from-background via-background to-transparent sm:w-32"
			/>
			<div
				aria-hidden="true"
				className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l from-background via-background to-transparent sm:w-32"
			/>

			<div className="flex flex-col gap-4">
				<CarrouselRow items={rowOne} direction="left" />
				<CarrouselRow items={rowTwo} direction="right" />
			</div>
		</section>
	);
}
