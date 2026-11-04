const POINTS = [
	{
		title: "Real fruit you can see",
		body: "Freeze-dried berries, apple, pear, and citrus peel, in pieces big enough to recognize in the pouch. No flavor dust standing in for fruit.",
		icon: <path d="M12 7c-3.5-2.5-8 0-8 5s4 9 8 9 8-4 8-9-4.5-7.5-8-5Zm0 0c0-2 1-3.5 3-4" />,
	},
	{
		title: "Stevia leaf, not sugar",
		body: "The sweet blends use cut stevia leaf, the whole herb, so you get sweetness without sugar. Several blends are unsweetened, and every label says which.",
		icon: <path d="M5 19c8 0 14-6 14-14C11 5 5 11 5 19Zm0 0 8-8" />,
	},
	{
		title: "Small batches, by hand",
		body: "Weighed on a gram scale, mixed in small batches, and packed in Southwest Ohio. Each pouch carries a batch date.",
		icon: <path d="M4 10h16l-1.5 9.5a1 1 0 0 1-1 .5h-11a1 1 0 0 1-1-.5L4 10Zm4 0V7a4 4 0 0 1 8 0v3" />,
	},
];

/** Three plain-language facts. Icons are stand-ins until your ink drawings replace them. */
export function ProofPoints() {
	return (
		<ul role="list" className="grid gap-10 md:grid-cols-3">
			{POINTS.map((p) => (
				<li key={p.title} className="border-t border-line-rule pt-6">
					<svg aria-hidden="true" viewBox="0 0 24 24" className="size-8 text-ink" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
						{p.icon}
					</svg>
					<h3 className="mt-5 font-display text-2xl font-medium">{p.title}</h3>
					<p className="mt-2 leading-relaxed text-pretty text-ink-muted">{p.body}</p>
				</li>
			))}
		</ul>
	);
}
