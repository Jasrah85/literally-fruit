import { formatRange, type Brew, type Product } from "@/lib/catalog";

function BrewSteps({ title, brew }: { title: string; brew: Brew }) {
	const cold = (typeof brew.tempF === "number" ? brew.tempF : brew.tempF[1]) <= 45;
	const rows: [string, string][] = [
		["Amount", `${brew.measure} (${brew.grams} g)`],
		["Water", `${brew.waterOz} oz${cold ? ", cold" : ` at ${formatRange(brew.tempF, "°F")}`}`],
	];
	if (brew.minutes !== undefined) rows.push(["Steep", `${formatRange(brew.minutes)} minutes`]);
	return (
		<div className="rounded-[0.625rem] border border-line-rule p-6">
			<h3 className="font-display text-2xl font-medium">{title}</h3>
			<dl className="mt-4 flex flex-col gap-2.5">
				{rows.map(([k, v]) => (
					<div key={k} className="grid grid-cols-[5.5rem_1fr] gap-3 text-[0.9375rem]">
						<dt className="text-ink-muted">{k}</dt>
						<dd>{v}</dd>
					</div>
				))}
			</dl>
			{brew.note && <p className="mt-4 text-sm leading-relaxed text-pretty text-ink-muted">{brew.note}</p>}
		</div>
	);
}

/** Hot and iced side by side. Simpler than tabs, and nothing is hidden. */
export function BrewGuideCard({ product: p }: { product: Product }) {
	return (
		<div className={p.brew.iced ? "grid gap-4 md:grid-cols-2" : "grid gap-4"}>
			<BrewSteps title={p.format === "powder" ? "Hot latte" : "Hot"} brew={p.brew.hot} />
			{p.brew.iced && <BrewSteps title={p.format === "powder" ? "Iced latte" : "Iced"} brew={p.brew.iced} />}
		</div>
	);
}
