import { getFeatured, getProducts } from "@/lib/catalog";
import { CTA, SITE } from "@/lib/site";
import { LinkButton } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { JsonLd } from "@/components/ui/JsonLd";
import { Hero } from "@/components/marketing/Hero";
import { LineSplit } from "@/components/marketing/LineSplit";
import { ProofPoints } from "@/components/marketing/ProofPoints";
import { RitualSteps } from "@/components/marketing/RitualSteps";
import { StoryBlock } from "@/components/marketing/StoryBlock";
import { EmailSignup } from "@/components/marketing/EmailSignup";
import { ProductGrid } from "@/components/catalog/ProductGrid";

export default function HomePage() {
	const featured = getFeatured().slice(0, 4);
	const flavors = getProducts().map((p) => ({ slug: p.slug, name: p.number ? `Nº ${p.number} ${p.name}` : p.name }));

	return (
		<>
			<JsonLd
				data={{
					"@context": "https://schema.org",
					"@type": "Organization",
					name: SITE.name,
					url: SITE.url,
					description: SITE.description,
				}}
			/>
			<Hero
				glow
				eyebrow="Small-batch loose-leaf tea"
				title={
					<>
						Real fruit.
						<br />
						No sugar.
						<br />A slower cup.
					</>
				}
				intro={<p>Fruit teas sweetened with stevia leaf, and apothecary-style herbal blends without the fruit. All blended by hand in Southwest Ohio.</p>}
				actions={
					<>
						<LinkButton href={CTA.href} size="lg">
							{CTA.label}
						</LinkButton>
						<LinkButton href="/shop" variant="ghost">
							See the blends
						</LinkButton>
					</>
				}
				image={{ src: "site/home-hero", alt: "A cup of fruit tea being poured on a dark table", label: "A slow pour", tint: "#b5622a" }}
			/>

			<Section id="lines" eyebrow="Two lines, one kettle" title="Bright fruit, or slow botanicals" ruled>
				<LineSplit />
			</Section>

			<Section id="featured" title="From the first batch" intro={<p>Our year-round blends. Everything is coming soon, so join the list to get the first pouches.</p>} width="wide">
				<ProductGrid products={featured} />
				<div className="mt-10">
					<LinkButton href="/shop" variant="secondary">
						All {getProducts().length} blends
					</LinkButton>
				</div>
			</Section>

			<Section id="whats-in-it" eyebrow="What's in the pouch" title="Plain ingredients, said plainly" ruled>
				<ProofPoints />
			</Section>

			<Section id="ritual" eyebrow="The ritual" title="Three steps to a good cup" ruled>
				<RitualSteps />
				<div className="mt-10">
					<LinkButton href="/brew" variant="ghost">
						The full brew guide
					</LinkButton>
				</div>
			</Section>

			<Section space="md">
				<StoryBlock
					title="From a small farm in Southwest Ohio"
					image={{ src: "site/farm", alt: "The farm in Southwest Ohio at golden hour", label: "The farm", tint: "#8a6a35" }}
					action={
						<LinkButton href="/about" variant="secondary">
							Our story
						</LinkButton>
					}
				>
					<p>Literally Fruit started as a fruit wine label for the farm where we&rsquo;re planting our first vineyard.</p>
					<p>The teas came first. They use the same fruit, the same flavors, and hand-drawn labels.</p>
				</StoryBlock>
			</Section>

			<Section id="signup" eyebrow="First batch" title="Get the first pouches" intro={<p>Join the list for launch news and first-batch access. Tell us your state so we know where to ship next.</p>} ruled>
				<EmailSignup source="home" flavors={flavors} />
			</Section>
		</>
	);
}
