const STEPS = [
	{ title: "Measure", body: "About a heaping teaspoon per 8 oz cup. Herbal blends are bulkier, so use a little more." },
	{ title: "Steep", body: "Just-boiled water for herbal and black teas, cooler water for white and oolong. Every pouch lists the time." },
	{ title: "Slow down", body: "Strain, then make it yours: a splash of milk, a slice of lemon, or nothing at all." },
];

export function RitualSteps() {
	return (
		<ol className="grid gap-10 md:grid-cols-3">
			{STEPS.map((s, i) => (
				<li key={s.title} className="flex gap-5">
					<span aria-hidden="true" className="font-display text-5xl leading-none text-ink-muted">
						{i + 1}
					</span>
					<div>
						<h3 className="font-display text-2xl font-medium">{s.title}</h3>
						<p className="mt-2 leading-relaxed text-pretty text-ink-muted">{s.body}</p>
					</div>
				</li>
			))}
		</ol>
	);
}
