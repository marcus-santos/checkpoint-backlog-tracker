const faqs = [
	{
		q: "Is Checkpoint really free to use?",
		a: "Yes, absolutely. Creating an account, syncing your libraries, and tracking your backlog is 100% free. While we do offer a voluntary donation system that grants you some cosmetic perks and help to keep our servers running, we will never lock a core feature of the platform behind a paywall.",
	},
	{
		q: "How does the multiplatform syncing work?",
		a: "For open platforms like GOG or RetroAchievements, you just need to provide your public username. For closed ecosystems such as Epic Games, you can easily add, search, and customize any game manually using our rich global database.",
	},
	{
		q: "Will Checkpoint ask for my gaming passwords?",
		a: "Never. Your security is our absolute priority. We do not collect, store, or request passwords for any gaming service. All automated connections rely strictly on public profile data or community-approved secure tokens.",
	},
	{
		q: "Where do the game completion times come from?",
		a: "We aggregate industry-standard data from community benchmarks to give you an accurate estimate of how long a game takes to finish—whether you are just rushing the main story or aiming for a 100% completionist run.",
	},
	{
		q: "How does the leveling and XP system work?",
		a: "Every time you update your progress, review a title, or mark a game as completed, you earn XP toward leveling up your profile. To keep things fair and fun for everyone, we use smart background validations that tie XP to actual game lengths and healthy activity limits.",
	},
];

export function FAQSection() {
	return (
		<section id="faq" className="scroll-mt-24 px-4 py-16 sm:px-6 lg:px-8">
			<div className="border-t border-border mx-auto max-w-3xl pt-12">
				<h2 className="text-center text-2xl font-bold tracking-tight text-foreground">
					Frequently asked questions
				</h2>
				<dl className="mt-8 divide-y divide-border">
					{faqs.map((faq) => (
						<div key={faq.q} className="py-5">
							<dt className="font-semibold text-foreground">{faq.q}</dt>
							<dd className="mt-2 leading-relaxed text-muted-foreground">
								{faq.a}
							</dd>
						</div>
					))}
				</dl>
			</div>
		</section>
	);
}
