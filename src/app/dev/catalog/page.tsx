import type { Metadata } from "next";
import { getProducts, isPublic, LINES, displayName, formatBrew, SEASON_LABEL, type Line } from "@/lib/catalog";
import { LineTheme } from "@/components/ui/LineTheme";
import { Section } from "@/components/ui/Section";
import { Button, LinkButton } from "@/components/ui/Button";
import { Badge, LineBadge, StatusBadge } from "@/components/ui/Badge";
import { ProductGrid } from "@/components/catalog/ProductGrid";
import { CaffeineMeter } from "@/components/catalog/CaffeineMeter";
import { SweetnessIndicator } from "@/components/catalog/SweetnessIndicator";

/*
 * Internal test page for Stage B: tokens, primitives, and every blend from
 * data/products.json in both line themes. Not linked from anywhere.
 * Delete or protect it before the Phase 0 launch.
 */
export const metadata: Metadata = {
	title: "Catalog test · Literally Fruit",
	robots: { index: false, follow: false },
};

const ROLES = [
	["surface", "surface"],
	["surface-raised", "surface-raised"],
	["ink", "ink"],
	["ink-muted", "ink-muted"],
	["rule", "line-rule"],
	["accent", "accent"],
	["label", "label"],
] as const;
const LINE_IDS: Line[] = ["fruit", "artisan"];

export default function CatalogTestPage() {
	const all = getProducts({ includeInternal: true });
	const internal = all.filter((p) => !isPublic(p));

	return (
		<main>
			<LineTheme line="fruit">
				<Section
					space="sm"
					width="wide"
					eyebrow="Internal · Stage B"
					title="Catalog and design tokens"
					intro={
						<p>
							{all.length} blends from <code>data/products.json</code>. {all.length - internal.length} are public;{" "}
							{internal.length} stay hidden until ODA confirms they&rsquo;re cottage foods. Placeholders show until photos land in{" "}
							<code>assets/raw</code>.
						</p>
					}
				>
					<div className="grid gap-5 lg:grid-cols-2">
						{LINE_IDS.map((line) => (
							<LineTheme key={line} line={line} className="rounded-[0.625rem] border border-line-rule p-6">
								<p className="font-display text-2xl">{LINES[line].name}</p>
								<p className="mt-1 text-sm text-ink-muted">{LINES[line].kicker}</p>
								<div className="mt-5 grid grid-cols-7 gap-2">
									{ROLES.map(([cssVar, role]) => (
										<div key={role} className="flex flex-col gap-1.5">
											<span
												className="h-12 rounded-[0.25rem] border border-ink/20"
												style={{ background: `var(--lf-${cssVar})` }}
											/>
											<span className="text-[0.625rem] leading-tight text-ink-muted">{role}</span>
										</div>
									))}
								</div>
								<div className="mt-6 flex flex-wrap items-center gap-3">
									<Button>Join the waitlist</Button>
									<Button variant="secondary">Brew guide</Button>
									<LinkButton href="/" variant="ghost">
										Our story
									</LinkButton>
								</div>
								<div className="mt-5 flex flex-wrap items-center gap-2">
									<LineBadge line={line} />
									<StatusBadge status="coming-soon" />
									<StatusBadge status="seasonal-off" />
									<StatusBadge status="available" soldOut />
									<Badge tone="accent">New</Badge>
								</div>
								<div className="mt-5 flex flex-col gap-1.5">
									<CaffeineMeter level={line === "fruit" ? "high" : "none"} />
									<SweetnessIndicator sweetness={line === "fruit" ? 2 : 0} sweeteners={line === "fruit" ? ["stevia-leaf"] : []} />
								</div>
							</LineTheme>
						))}
					</div>
				</Section>

				<Section space="sm" width="wide" id="all" title="All blends, mixed grid" ruled>
					<ProductGrid products={all} priorityCount={4} />
				</Section>
			</LineTheme>

			{LINE_IDS.map((line) => (
				<LineTheme key={line} line={line} as="section">
					<Section space="sm" width="wide" id={line} title={LINES[line].name} intro={<p>{LINES[line].blurb}</p>} ruled>
						<div className="overflow-x-auto">
							<table className="w-full min-w-[48rem] border-collapse text-left text-sm">
								<thead className="text-xs tracking-[0.12em] text-ink-muted uppercase">
									<tr className="border-b border-line-rule">
										<th className="py-2 pr-4 font-semibold">Blend</th>
										<th className="py-2 pr-4 font-semibold">Season</th>
										<th className="py-2 pr-4 font-semibold">Hot brew</th>
										<th className="py-2 pr-4 font-semibold">Size</th>
										<th className="py-2 font-semibold">Site</th>
									</tr>
								</thead>
								<tbody>
									{all
										.filter((p) => p.line === line)
										.map((p) => (
											<tr key={p.id} className="border-b border-line-rule align-top">
												<td className="py-2.5 pr-4">
													<span className="mr-2 inline-block size-2.5 rounded-full ring-1 ring-ink/30" style={{ background: p.cupColor }} />
													{displayName(p)}
												</td>
												<td className="py-2.5 pr-4 text-ink-muted">{SEASON_LABEL[p.season]}</td>
												<td className="py-2.5 pr-4 text-ink-muted">{formatBrew(p.brew.hot)}</td>
												<td className="py-2.5 pr-4 text-ink-muted">{p.variants.map((v) => `${v.netWeightG} g`).join(", ")}</td>
												<td className="py-2.5">{isPublic(p) ? "Public" : <Badge>Hidden: ODA</Badge>}</td>
											</tr>
										))}
								</tbody>
							</table>
						</div>
					</Section>
				</LineTheme>
			))}
		</main>
	);
}
