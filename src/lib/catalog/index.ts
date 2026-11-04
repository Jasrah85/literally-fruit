/*
 * The only module that reads data/products.json. Pages and components import
 * from here, never from the JSON directly, so moving to a CMS later means
 * re-implementing this file and nothing else.
 *
 * Parsing happens once at module load, which is build time for pre-rendered
 * pages. Invalid JSON fails the build with the zod error.
 */
import raw from "../../../data/products.json";
import { CatalogFile, type Line, type Product, type Season } from "./schema";

export * from "./schema";
export * from "./format";
export { LINES } from "./lines";

function load(): Product[] {
	const result = CatalogFile.safeParse(raw);
	if (!result.success) {
		const lines = result.error.issues.map((i) => `  ${i.path.join(".")}: ${i.message}`);
		throw new Error(`data/products.json is invalid. Run \`npm run validate\` for details.\n${lines.join("\n")}`);
	}
	return result.data.products;
}

const ALL = load();

type Options = {
	/**
	 * Include hidden products and blends not yet confirmed as cottage foods.
	 * Only for internal pages; the public site never passes this.
	 */
	includeInternal?: boolean;
};

/** Public on the site: not hidden, and cleared as a cottage food. */
export function isPublic(p: Product): boolean {
	return p.status !== "hidden" && p.cottageEligible;
}

export function getProducts({ includeInternal = false }: Options = {}): Product[] {
	return includeInternal ? ALL : ALL.filter(isPublic);
}

export function getProduct(slug: string, opts?: Options): Product | undefined {
	return getProducts(opts).find((p) => p.slug === slug);
}

export function getByLine(line: Line, opts?: Options): Product[] {
	return getProducts(opts).filter((p) => p.line === line);
}

export function getBySeason(season: Season, opts?: Options): Product[] {
	return getProducts(opts).filter((p) => p.season === season);
}

export function getFeatured(opts?: Options): Product[] {
	return getProducts(opts).filter((p) => p.featured);
}

/** Slugs for generateStaticParams on /products/[slug]. */
export function getProductSlugs(): string[] {
	return getProducts().map((p) => p.slug);
}

/** Same line first, then the rest, excluding the product itself. */
export function getRelated(product: Product, limit = 3): Product[] {
	const others = getProducts().filter((p) => p.id !== product.id && p.status !== "seasonal-off");
	const sameLine = others.filter((p) => p.line === product.line);
	const rest = others.filter((p) => p.line !== product.line);
	return [...sameLine, ...rest].slice(0, limit);
}

/** 301 redirects from every previous slug, for next.config.ts. */
export function getRedirects(): { source: string; destination: string; permanent: true }[] {
	return ALL.flatMap((p) =>
		p.previousSlugs.map((old) => ({
			source: `/products/${old}`,
			destination: `/products/${p.slug}`,
			permanent: true as const,
		})),
	);
}
