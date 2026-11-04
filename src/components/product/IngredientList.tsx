import type { Product } from "@/lib/catalog";

export function IngredientList({ product: p }: { product: Product }) {
	const weights = [...new Set(p.variants.map((v) => v.netWeightG))];
	return (
		<div className="flex flex-col gap-4 text-[0.9375rem] leading-relaxed">
			<p>
				<span className="font-semibold">Ingredients: </span>
				{p.ingredients.join(", ")}.
			</p>
			<p>
				<span className="font-semibold">Allergens: </span>
				{p.allergens.length ? `Contains ${p.allergens.join(", ")}.` : "None of the major food allergens."}
			</p>
			{p.cautions.map((c) => (
				<p key={c} className="rounded-md border border-line-rule px-4 py-3">
					<span className="font-semibold">Caution: </span>
					{c}
				</p>
			))}
			{weights.length > 0 && (
				<p className="text-ink-muted">
					Net weight {weights.map((g) => `${g} g (${(g / 28.3495).toFixed(1)} oz)`).join(" or ")}. This is a home produced item.
				</p>
			)}
		</div>
	);
}
