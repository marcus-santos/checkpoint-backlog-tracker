import { Progress } from "@/components/ui/progress";
import { Trophy } from "lucide-react";

export type StatisticsItem = {
	label: "Completed" | "Backlog" | "Dropped" | "Ongoing";
	value: number;
	color: "completed" | "backlog" | "dropped" | "ongoing";
};

export const mockStatistics: StatisticsItem[] = [
	{ label: "Completed", value: 247, color: "completed" },
	{ label: "Dropped", value: 23, color: "dropped" },
	{ label: "Backlog", value: 83, color: "backlog" },
	{ label: "Ongoing", value: 4, color: "ongoing" },
];

const colorTokens: Record<StatisticsItem["color"], string> = {
	completed: "#22c55e",
	backlog: "#a855f7",
	dropped: "var(--brand)",
	ongoing: "#3b82f6",
};

const progressColors: Record<StatisticsItem["color"], string> = {
	completed: "bg-green-500",
	backlog: "bg-purple-500",
	dropped: "bg-primary",
	ongoing: "bg-blue-500",
};

type StatisticsOverviewGraphicProps = {
	statistics?: StatisticsItem[];
};

export function StatisticsOverviewGraphic({
	statistics = mockStatistics,
}: StatisticsOverviewGraphicProps) {
	const total = statistics.reduce((sum, item) => sum + item.value, 0);
	let currentPercentage = 0;
	const chartStops = statistics
		.map((item) => {
			const percentage = total ? (item.value / total) * 100 : 0;
			const start = currentPercentage;
			currentPercentage += percentage;
			return `${colorTokens[item.color]} ${start}% ${currentPercentage}%`;
		})
		.join(", ");

	return (
		<section className="min-h-0 w-full flex-1">
			<div className="flex h-full flex-col gap-4 rounded-2xl border border-border bg-card p-5">
				<div className="flex items-center gap-2">
					<Trophy size={14} className="text-primary" aria-hidden="true" />
					<h2 className="text-base font-bold">Statistics Overview</h2>
				</div>

				<div className="flex flex-col items-center gap-8 sm:flex-row">
					<div
						className="relative size-40 shrink-0 rounded-full"
						style={{ background: `conic-gradient(${chartStops})` }}
						role="img"
						aria-label={`Game library statistics: ${total} total games`}
					>
						<div className="absolute inset-3 flex flex-col items-center justify-center rounded-full bg-card">
							<span className="text-2xl font-bold">{total}</span>
							<span className="text-[10px] text-muted-foreground">Total</span>
						</div>
					</div>

					<div className="flex w-full min-w-0 flex-1 flex-col gap-3">
						{statistics.map((item) => {
							const percentage = total
								? Math.round((item.value / total) * 100)
								: 0;
							const color = colorTokens[item.color];

							return (
								<div key={item.label} className="flex items-center gap-3">
									<span
										className="size-2.5 shrink-0 rounded-full"
										style={{ backgroundColor: color, boxShadow: `0 0 6px ${color}` }}
									/>
									<span className="w-20 shrink-0 text-xs font-medium text-foreground/80">
										{item.label}
									</span>
									<Progress
										value={percentage}
										indicatorClassName={progressColors[item.color]}
										className="h-1.5 min-w-0 flex-1"
									/>
									<span className="w-8 shrink-0 text-right font-mono text-xs font-bold" style={{ color }}>
										{item.value}
									</span>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
}
