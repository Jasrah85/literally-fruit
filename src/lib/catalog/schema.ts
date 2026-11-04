import { z } from "zod";

/*
 * The shape of data/products.json.
 *
 * Content lives in the JSON; Square owns price, stock, and checkout. This
 * schema is the contract between the two, and it's shaped like a future CMS
 * model: stable ids, Markdown text, nothing derived, a `category` for wine later.
 *
 * Hard rules live here and fail the build. Soft rules (copy length, draft copy)
 * live in scripts/validate-catalog.ts and only warn.
 */

const kebab = z
	.string()
	.regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers, and single hyphens");

/** A single number or an inclusive [min, max] range, e.g. 212 or [205, 212]. */
const numberOrRange = z.union([
	z.number().positive(),
	z
		.tuple([z.number().positive(), z.number().positive()])
		.refine(([min, max]) => min < max, "Range must be [min, max] with min < max"),
]);

export const Line = z.enum(["fruit", "artisan"]);
export const Status = z.enum(["coming-soon", "available", "seasonal-off", "hidden"]);
export const Base = z.enum([
	"black",
	"green",
	"white",
	"oolong",
	"matcha",
	"herbal",
	"rooibos",
	"honeybush",
	"chicory",
	"mushroom",
]);
export const Caffeine = z.enum(["none", "low", "medium", "high"]);
export const Sweetener = z.enum(["stevia-leaf", "stevia-extract", "monk-fruit"]);
export const Season = z.enum(["core", "fall", "winter", "spring-summer"]);
export const RitualMoment = z.enum(["morning", "afternoon", "evening", "anytime"]);
export const Format = z.enum(["loose", "sachet", "powder"]);
export const Shot = z.enum(["pouch", "leaf", "cup", "lifestyle"]);

export const Brew = z.object({
	/** Grams per cup (or per serving). */
	grams: z.number().positive(),
	/** Human measure, e.g. "about 1½ tsp". */
	measure: z.string().min(1),
	waterOz: z.number().positive(),
	tempF: numberOrRange,
	/** Steep time. Omit for whisked or cold-brewed drinks that use `note` instead. */
	minutes: numberOrRange.optional(),
	note: z.string().optional(),
});

export const Variant = z.object({
	/** Stable id for this size; never reuse. */
	id: kebab,
	/** Shown on the selector, e.g. "Pouch · 20 cups". */
	label: z.string().min(1),
	netWeightG: z.number().positive(),
	/** Display price in cents. Square's catalog price is what's charged. */
	priceCents: z.number().int().positive().optional(),
	/** Square catalog variation id. Required once the product is available. */
	squareVariationId: z.string().min(1).optional(),
});

export const Product = z
	.object({
		/** Permanent key. Never changes, even if the name or slug does. */
		id: kebab,
		slug: kebab,
		/** Old slugs become 301 redirects to the current one. */
		previousSlugs: z.array(kebab).default([]),
		name: z.string().min(1),
		/** Artisan Infusions numbering: Nº 1, Nº 2, … */
		number: z.number().int().positive().optional(),
		category: z.literal("tea"),
		line: Line,
		status: Status,
		featured: z.boolean().default(false),
		/** Whether the copy below is final. The validator warns about drafts. */
		copyStatus: z.enum(["draft", "final"]).default("draft"),

		tagline: z.string().min(1).max(60),
		/** Markdown. */
		description: z.string().min(1),
		/** What it looks like and tastes like in the cup. */
		inTheCup: z.string().min(1),
		/** Brewed color as a hex value. Drives each blend's accent on the site. */
		cupColor: z.string().regex(/^#[0-9a-fA-F]{6}$/, "Use a 6-digit hex color like #b8642a"),

		base: Base,
		caffeine: Caffeine,
		/** Empty means unsweetened. */
		sweeteners: z.array(Sweetener).default([]),
		/** 0 = unsweetened, 3 = sweet. */
		sweetness: z.number().int().min(0).max(3),
		format: Format,
		flavorNotes: z.array(z.string().min(1)).min(3).max(5),
		/** In descending order by weight. Must match the printed label. */
		ingredients: z.array(z.string().min(1)).min(1),
		allergens: z.array(z.string().min(1)).default([]),
		/** Label cautions, printed on the product page next to ingredients. */
		cautions: z.array(z.string().min(1)).default([]),

		brew: z.object({
			hot: Brew,
			iced: Brew.optional(),
		}),
		serveWith: z.string().optional(),
		pairsWith: z.array(z.string().min(1)).default([]),
		cupsPerPackage: z.number().int().positive(),
		season: Season,
		ritualMoment: RitualMoment,
		wineTwin: z.string().optional(),

		/** Gallery order. Each shot is looked up in the image manifest at blends/<slug>/<shot>. */
		gallery: z.array(Shot).default(["pouch", "leaf", "cup"]),
		variants: z.array(Variant).default([]),

		/** Internal. False hides the blend from the public site until ODA confirms it's a cottage food. */
		cottageEligible: z.boolean(),
	})
	.superRefine((p, ctx) => {
		if (p.status === "available") {
			if (p.variants.length === 0) {
				ctx.addIssue({ code: "custom", path: ["variants"], message: "An available product needs at least one variant" });
			}
			p.variants.forEach((v, i) => {
				if (v.priceCents === undefined) {
					ctx.addIssue({ code: "custom", path: ["variants", i, "priceCents"], message: "Required once status is available" });
				}
				if (!v.squareVariationId) {
					ctx.addIssue({ code: "custom", path: ["variants", i, "squareVariationId"], message: "Required once status is available" });
				}
			});
			if (!p.cottageEligible) {
				ctx.addIssue({ code: "custom", path: ["cottageEligible"], message: "Can't be available until ODA confirms it's a cottage food" });
			}
		}
		if (p.line === "artisan" && p.number === undefined) {
			ctx.addIssue({ code: "custom", path: ["number"], message: "Artisan Infusions blends need a number (Nº)" });
		}
		if ((p.sweeteners.length === 0) !== (p.sweetness === 0)) {
			ctx.addIssue({ code: "custom", path: ["sweetness"], message: "Sweetness must be 0 exactly when there are no sweeteners" });
		}
		if (p.previousSlugs.includes(p.slug)) {
			ctx.addIssue({ code: "custom", path: ["previousSlugs"], message: "Can't include the current slug" });
		}
		const joined = p.ingredients.join(" ").toLowerCase();
		const declared = p.allergens.join(" ").toLowerCase();
		for (const nut of ["almond", "walnut", "pecan", "hazelnut", "cashew", "pistachio", "coconut"]) {
			if (joined.includes(nut) && !declared.includes(nut)) {
				ctx.addIssue({ code: "custom", path: ["allergens"], message: `Ingredients mention ${nut}; declare it as an allergen` });
			}
		}
	});

export const CatalogFile = z
	.object({
		$schema: z.string().optional(),
		products: z.array(Product).min(1),
	})
	.superRefine((file, ctx) => {
		const seen = new Map<string, string>();
		const claim = (key: string, owner: string, path: (string | number)[]) => {
			const prior = seen.get(key);
			if (prior) ctx.addIssue({ code: "custom", path, message: `"${key.split(":")[1]}" is already used by ${prior}` });
			else seen.set(key, owner);
		};
		file.products.forEach((p, i) => {
			claim(`id:${p.id}`, p.id, ["products", i, "id"]);
			claim(`slug:${p.slug}`, p.id, ["products", i, "slug"]);
			p.previousSlugs.forEach((s, j) => claim(`slug:${s}`, p.id, ["products", i, "previousSlugs", j]));
			p.variants.forEach((v, j) => claim(`variant:${v.id}`, p.id, ["products", i, "variants", j, "id"]));
			if (p.number !== undefined) claim(`number:${p.line}-${p.number}`, p.id, ["products", i, "number"]);
		});
	});

export type Product = z.output<typeof Product>;
export type ProductInput = z.input<typeof Product>;
export type Variant = z.output<typeof Variant>;
export type Brew = z.output<typeof Brew>;
export type Line = z.output<typeof Line>;
export type Status = z.output<typeof Status>;
export type Caffeine = z.output<typeof Caffeine>;
export type Season = z.output<typeof Season>;
export type Shot = z.output<typeof Shot>;
