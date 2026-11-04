import type { Product } from "@/lib/catalog";

export function PairsWith({ product: p }: { product: Product }) {
	if (!p.pairsWith.length && !p.serveWith && !p.wineTwin) return null;
	return (
		<div className="flex flex-col gap-4 text-[0.9375rem] leading-relaxed">
			{p.serveWith && <p>{p.serveWith}</p>}
			{p.pairsWith.length > 0 && (
				<p>
					<span className="font-semibold">With food: </span>
					{p.pairsWith.join(", ")}.
				</p>
			)}
			{p.wineTwin && (
				<p className="text-ink-muted">
					<span className="font-semibold text-ink">Wine twin: </span>
					{p.wineTwin}, coming once the vineyard is planted.
				</p>
			)}
		</div>
	);
}
