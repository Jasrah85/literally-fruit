import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LINES, displayName, formatPrice, getProduct, getProductSlugs, getRelated, lowestPrice, SEASON_LABEL } from "@/lib/catalog";
import { SITE } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { LineTheme } from "@/components/ui/LineTheme";
import { LineBadge, StatusBadge, Badge } from "@/components/ui/Badge";
import { JsonLd } from "@/components/ui/JsonLd";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/content/Breadcrumbs";
import { Prose } from "@/components/content/Prose";
import { ProductGrid } from "@/components/catalog/ProductGrid";
import { ProductGallery } from "@/components/product/ProductGallery";
import { QuickFacts } from "@/components/product/QuickFacts";
import { TastingNotes } from "@/components/product/TastingNotes";
import { BrewGuideCard } from "@/components/product/BrewGuideCard";
import { IngredientList } from "@/components/product/IngredientList";
import { PairsWith } from "@/components/product/PairsWith";
import { EmailSignup } from "@/components/marketing/EmailSignup";

type Params = { params: Promise<{ slug: string }> };

// Every product page is built at deploy. Unknown slugs 404 instead of rendering on demand.
export const dynamicParams = false;

export function generateStaticParams() {
	return getProductSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
	const p = getProduct((await params).slug);
	if (!p) return {};
	const name = displayName(p);
	return {
		title: `${name}, ${LINES[p.line].name}`,
		description: `${p.tagline} ${p.inTheCup}`.slice(0, 160),
		alternates: { canonical: `/products/${p.slug}` },
		openGraph: { title: `${name} | ${SITE.name}`, description: p.tagline, type: "website" },
	};
}

export default async function ProductPage({ params }: Params) {
	const p = getProduct((await params).slug);
	if (!p) notFound();

	const name = displayName(p);
	const line = LINES[p.line];
	const price = lowestPrice(p);
	const available = p.status === "available";

	return (
		<LineTheme line={p.line} blend={p.cupColor}>
			<JsonLd
				data={{
					"@context": "https://schema.org",
					"@type": "Product",
					name,
					description: p.tagline,
					brand: { "@type": "Brand", name: SITE.name },
					category: line.name,
					url: `${SITE.url}/products/${p.slug}`,
					...(available && price !== undefined
						? { offers: { "@type": "Offer", price: (price / 100).toFixed(2), priceCurrency: "USD", availability: "https://schema.org/InStock" } }
						: {}),
				}}
			/>
			<Container width="wide" className="pt-8">
				<Breadcrumbs
					items={[
						{ label: "Shop", href: "/shop" },
						{ label: line.name, href: line.path },
						{ label: name, href: `/products/${p.slug}` },
					]}
				/>
			</Container>

			<Container width="wide" className="grid gap-10 py-10 lg:grid-cols-[1fr_1fr] lg:gap-16 lg:py-14">
				<ProductGallery product={p} />
				<div className="flex flex-col gap-7">
					<div>
						<div className="flex flex-wrap items-center gap-2">
							<LineBadge line={p.line} />
							<StatusBadge status={p.status} />
							{p.season !== "core" && <Badge>{SEASON_LABEL[p.season]}</Badge>}
						</div>
						<h1 className="mt-5 font-display text-5xl leading-[1] font-medium tracking-(--lf-display-tracking) text-balance sm:text-6xl">{name}</h1>
						<p className="mt-4 text-xl text-pretty text-ink-muted">{p.tagline}</p>
					</div>

					{available && price !== undefined ? (
						// Stage D: VariantSelector, QuantityInput, AddToCartButton, ShippingEligibilityNote.
						<p className="text-2xl font-semibold">{formatPrice(price)}</p>
					) : (
						<div className="rounded-[0.625rem] border border-line-rule bg-surface-raised p-6">
							<p className="font-display text-2xl">Coming with the first batch</p>
							<p className="mt-1 mb-5 text-sm text-ink-muted">Get an email when {name} is ready, before it&rsquo;s announced anywhere else.</p>
							<EmailSignup compact source={`product:${p.slug}`} preselect={p.slug} submitLabel="Notify me" />
						</div>
					)}

					<QuickFacts product={p} />

					<div>
						<h2 className="mb-3 text-xs font-semibold tracking-[0.14em] text-ink-muted uppercase">Tasting notes</h2>
						<TastingNotes notes={p.flavorNotes} />
					</div>
					<Prose text={p.description} className="text-lg leading-relaxed" />
					<p className="flex items-center gap-3 text-[0.9375rem] text-ink-muted">
						<span aria-hidden="true" className="size-4 shrink-0 rounded-full bg-blend ring-1 ring-ink/30" />
						{p.inTheCup}
					</p>
				</div>
			</Container>

			<Section title="How to brew it" width="wide" space="sm" ruled>
				<div className={p.brew.iced ? "max-w-4xl" : "max-w-xl"}>
					<BrewGuideCard product={p} />
				</div>
			</Section>

			<Container width="wide" className="grid gap-12 py-12 md:grid-cols-2 lg:gap-16">
				<div>
					<h2 className="mb-4 font-display text-3xl font-medium">What&rsquo;s in it</h2>
					<IngredientList product={p} />
				</div>
				<div>
					<h2 className="mb-4 font-display text-3xl font-medium">Goes well with</h2>
					<PairsWith product={p} />
				</div>
			</Container>

			<Section title="You might also like" width="wide" space="sm" ruled>
				<ProductGrid products={getRelated(p, 4)} />
			</Section>
		</LineTheme>
	);
}
