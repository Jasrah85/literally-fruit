import type { Metadata } from "next";
import Link from "next/link";
import { displayName, formatRange, getProducts, type Product } from "@/lib/catalog";
import { Section } from "@/components/ui/Section";
import { RitualSteps } from "@/components/marketing/RitualSteps";

export const metadata: Metadata = {
	title: "Brew guide",
	description: "How to brew loose-leaf fruit tea and herbal blends: water temperature, steep times, iced tea, cold brew, and sweetening.",
	alternates: { canonical: "/brew" },
};

const BASE_NAME: Record<Product["base"], string> = {
	black: "Black tea",
	green: "Green tea",
	white: "White tea",
	oolong: "Oolong",
	matcha: "Matcha (latte)",
	herbal: "Herbal and hibiscus",
	rooibos: "Rooibos",
	honeybush: "Honeybush",
	chicory: "Roasted chicory",
	mushroom: "Cacao and chaga",
};

type Row = { base: Product["base"]; temp: [number, number]; minutes?: [number, number]; blends: Product[] };

/** One row per base, built from the catalog so it never disagrees with the product pages. */
function brewTable(products: Product[]): Row[] {
	const rows = new Map<Product["base"], Row>();
	const span = (v: number | readonly [number, number]): [number, number] => (typeof v === "number" ? [v, v] : [v[0], v[1]]);
	for (const p of products) {
		const t = span(p.brew.hot.tempF);
		const m = p.brew.hot.minutes === undefined ? undefined : span(p.brew.hot.minutes);
		const row = rows.get(p.base);
		if (!row) {
			rows.set(p.base, { base: p.base, temp: t, minutes: m, blends: [p] });
			continue;
		}
		row.temp = [Math.min(row.temp[0], t[0]), Math.max(row.temp[1], t[1])];
		if (m) row.minutes = row.minutes ? [Math.min(row.minutes[0], m[0]), Math.max(row.minutes[1], m[1])] : m;
		row.blends.push(p);
	}
	return [...rows.values()].sort((a, b) => a.temp[0] - b.temp[0]);
}

const range = ([a, b]: [number, number], unit = "") => (a === b ? `${a}${unit}` : formatRange([a, b], unit));

export default function BrewPage() {
	const rows = brewTable(getProducts());
	return (
		<>
			<Section
				eyebrow="Brew guide"
				title="How to brew a good cup"
				intro={<p>Loose tea is forgiving. Get the water temperature roughly right, set a timer, and taste as you go.</p>}
			>
				<RitualSteps />
			</Section>

			<Section title="Temperature and time" intro={<p>Per 8 oz of water. Each product page has the exact amount for that blend.</p>} ruled>
				<div className="overflow-x-auto">
					<table className="w-full min-w-[40rem] border-collapse text-left">
						<thead className="text-xs tracking-[0.12em] text-ink-muted uppercase">
							<tr className="border-b border-line-rule">
								<th scope="col" className="py-3 pr-6 font-semibold">Base</th>
								<th scope="col" className="py-3 pr-6 font-semibold">Water</th>
								<th scope="col" className="py-3 pr-6 font-semibold">Steep</th>
								<th scope="col" className="py-3 font-semibold">Our blends</th>
							</tr>
						</thead>
						<tbody>
							{rows.map((r) => (
								<tr key={r.base} className="border-b border-line-rule align-top">
									<th scope="row" className="py-4 pr-6 font-display text-lg font-medium">{BASE_NAME[r.base]}</th>
									<td className="py-4 pr-6 whitespace-nowrap">{range(r.temp, "°F")}</td>
									<td className="py-4 pr-6 whitespace-nowrap">{r.minutes ? `${range(r.minutes)} min` : "Whisk, don't steep"}</td>
									<td className="py-4 text-ink-muted">
										{r.blends.map((b, i) => (
											<span key={b.id}>
												{i > 0 && ", "}
												<Link href={`/products/${b.slug}`} className="underline decoration-ink/30 underline-offset-4 hover:text-ink">
													{displayName(b)}
												</Link>
											</span>
										))}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				<p className="mt-6 max-w-[65ch] text-ink-muted">
					No thermometer? Boiling water is 212°F. Let it sit off the heat for about 2 minutes for 195°F, or 5 minutes for 175°F.
				</p>
			</Section>

			<Section title="Iced tea, two ways" width="content" ruled>
				<div className="grid gap-10 md:grid-cols-2">
					<div>
						<h3 className="font-display text-2xl font-medium">Hot-brewed over ice</h3>
						<p className="mt-3 leading-relaxed text-pretty text-ink-muted">
							Brew double strength: twice the tea in the same amount of water, steeped for the usual time. Strain it straight over a full glass
							of ice. The ice melts down to the right strength. Best for hibiscus blends like Cran-Pom.
						</p>
					</div>
					<div>
						<h3 className="font-display text-2xl font-medium">Cold brew</h3>
						<p className="mt-3 leading-relaxed text-pretty text-ink-muted">
							Use about 1½ times the usual amount of tea in cold water, cover, and leave it in the fridge for 6 to 8 hours. Strain and drink
							within two days. Cold brew is smoother and naturally sweeter, and it&rsquo;s the best way to make white tea and mint blends.
						</p>
					</div>
				</div>
			</Section>

			<Section title="Sweetening" width="content" ruled>
				<div className="flex flex-col gap-4 text-lg leading-relaxed text-pretty text-ink-muted">
					<p>
						Our sweetened blends already have stevia leaf in the pouch, so taste before adding anything. If you want more, honey suits the herbal
						blends and brown sugar or maple suits the spiced ones.
					</p>
					<p>
						Iced tea tastes less sweet than hot, so a blend that&rsquo;s balanced hot may want a little more when it&rsquo;s cold. Hibiscus blends
						are tart by nature; a bit of sweetness brings out the fruit.
					</p>
				</div>
			</Section>
		</>
	);
}
