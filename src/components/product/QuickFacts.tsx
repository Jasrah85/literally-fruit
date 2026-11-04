import type { Product } from "@/lib/catalog";
import { CaffeineMeter } from "@/components/catalog/CaffeineMeter";
import { SweetnessIndicator } from "@/components/catalog/SweetnessIndicator";

const BASE_LABEL: Record<Product["base"], string> = {
	black: "Black tea",
	green: "Green tea",
	white: "White tea",
	oolong: "Oolong",
	matcha: "Matcha",
	herbal: "Herbal",
	rooibos: "Rooibos",
	honeybush: "Honeybush",
	chicory: "Roasted chicory",
	mushroom: "Cacao and mushroom",
};

const FORMAT_LABEL: Record<Product["format"], string> = { loose: "Loose leaf", sachet: "Sachets", powder: "Powder" };

export function QuickFacts({ product: p }: { product: Product }) {
	const facts: [string, React.ReactNode][] = [
		["Base", BASE_LABEL[p.base]],
		["Caffeine", <CaffeineMeter key="c" level={p.caffeine} />],
		["Sweetness", <SweetnessIndicator key="s" sweetness={p.sweetness} sweeteners={p.sweeteners} />],
		["Makes", `${p.cupsPerPackage} ${p.format === "powder" ? "lattes" : "cups"} · ${FORMAT_LABEL[p.format].toLowerCase()}`],
	];
	return (
		<dl className="grid grid-cols-2 gap-x-6 gap-y-5 border-y border-line-rule py-6">
			{facts.map(([label, value]) => (
				<div key={label}>
					<dt className="text-xs font-semibold tracking-[0.14em] text-ink-muted uppercase">{label}</dt>
					<dd className="mt-1.5 text-[0.9375rem]">{value}</dd>
				</div>
			))}
		</dl>
	);
}
