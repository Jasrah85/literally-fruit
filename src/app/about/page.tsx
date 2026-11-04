import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { LinkButton } from "@/components/ui/Button";
import { StoryBlock } from "@/components/marketing/StoryBlock";
import { ProofPoints } from "@/components/marketing/ProofPoints";

export const metadata: Metadata = {
	title: "Our story",
	description: "Literally Fruit is a small-batch tea and fruit wine label from a farm in Southwest Ohio.",
	alternates: { canonical: "/about" },
};

/*
 * DRAFT COPY. Written from the brand plan, not in your voice yet. Rewrite it
 * before launch: this page works best when it sounds like one person talking.
 */
export default function AboutPage() {
	return (
		<>
			<Section eyebrow="Our story" title="Literally fruit. That's the whole idea." width="prose">
				<div className="flex flex-col gap-5 text-xl leading-relaxed text-pretty text-ink-muted">
					<p>
						Literally Fruit began as a name for fruit wines: cinnamon apple, cranberry and pomegranate, strawberry, pear, made in small batches and
						shared with friends. The plan is a small farm winery on our land in Southwest Ohio, starting with the first rows of grapes.
					</p>
					<p>Vineyards take years. Tea doesn&rsquo;t. So the teas came first, built on the same fruit and the same flavors.</p>
				</div>
			</Section>

			<Section space="md">
				<StoryBlock title="Blended by hand, in small batches" image={{ src: "site/process", alt: "Weighing dried fruit and herbs on a kitchen scale", label: "Blending by hand", tint: "#9b1d33" }}>
					<p>
						Every recipe starts as a test card: ingredients weighed to a tenth of a gram, two small pouches, then a week of tasting. The ones that
						survive a tasting party with honest friends become blends.
					</p>
					<p>
						This isn&rsquo;t the first time we&rsquo;ve done it. Herbal blends were the most successful thing we sold in an earlier small
						business, and the craft carries over: good botanicals, measured carefully, mixed gently.
					</p>
				</StoryBlock>
			</Section>

			<Section space="md">
				<StoryBlock
					flip
					title="Why stevia leaf"
					image={{ src: "site/stevia", alt: "Dried stevia leaves next to a cup of fruit tea", label: "Stevia leaf", tint: "#7d8b52" }}
				>
					<p>
						We like a fruit tea that tastes a little sweet, the way fruit does, without stirring sugar into every cup. Cut stevia leaf, the dried
						herb, gets us there. It goes in the pouch in small amounts, so the fruit leads.
					</p>
					<p>Not every blend needs it. Most Artisan Infusions are unsweetened, and every label says which is which.</p>
				</StoryBlock>
			</Section>

			<Section space="md">
				<StoryBlock
					title="A drawing on every label"
					image={{ src: "site/label-art", alt: "Ink drawings of fruit and botanicals for the tea labels", label: "Label art", tint: "#c4a062" }}
				>
					<p>
						Each blend gets its own ink drawing. On the Fruit Teas, it&rsquo;s the fruit at the center of the blend. On the Artisan Infusions,
						it&rsquo;s a small scene that sets the mood for the cup.
					</p>
				</StoryBlock>
			</Section>

			<Section title="What you can count on" ruled>
				<ProofPoints />
				<div className="mt-12">
					<LinkButton href="/waitlist">Join the first batch</LinkButton>
				</div>
			</Section>
		</>
	);
}
