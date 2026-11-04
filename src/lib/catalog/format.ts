import type { Brew, Caffeine, Product, Season } from "./schema";

type NumberOrRange = number | readonly [number, number];

export function formatRange(value: NumberOrRange, unit = ""): string {
	return typeof value === "number" ? `${value}${unit}` : `${value[0]}–${value[1]}${unit}`;
}

export function formatPrice(cents: number): string {
	return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents / 100);
}

export function formatBrew(brew: Brew): string {
	const parts = [`${brew.measure} (${brew.grams} g) per ${brew.waterOz} oz`, formatRange(brew.tempF, "°F")];
	if (brew.minutes !== undefined) parts.push(`${formatRange(brew.minutes)} min`);
	return parts.join(" · ");
}

/** "Nº 1 Unwind" for Artisan Infusions, plain name otherwise. */
export function displayName(p: Pick<Product, "name" | "number">): string {
	return p.number === undefined ? p.name : `Nº ${p.number} ${p.name}`;
}

export const CAFFEINE_LABEL: Record<Caffeine, string> = {
	none: "Caffeine-free",
	low: "Low caffeine",
	medium: "Medium caffeine",
	high: "High caffeine",
};

export const SWEETNESS_LABEL = ["Unsweetened", "Lightly sweet", "Sweet", "Very sweet"] as const;

export const SEASON_LABEL: Record<Season, string> = {
	core: "Year-round",
	fall: "Fall",
	winter: "Winter",
	"spring-summer": "Spring & summer",
};

export function lowestPrice(p: Product): number | undefined {
	const prices = p.variants.map((v) => v.priceCents).filter((c): c is number => c !== undefined);
	return prices.length ? Math.min(...prices) : undefined;
}
