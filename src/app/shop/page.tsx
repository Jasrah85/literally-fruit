import type { Metadata } from "next";
import { LINES, getByLine, type Line } from "@/lib/catalog";
import { Section } from "@/components/ui/Section";
import { LinkButton } from "@/components/ui/Button";
import { ProductGrid } from "@/components/catalog/ProductGrid";

export const metadata: Metadata = {
	title: "Shop all blends",
	description: "Every Literally Fruit blend: stevia-sweetened fruit teas and Artisan Infusions herbal blends, with caffeine and sweetness on every card.",
	alternates: { canonical: "/shop" },
};

const ORDER: Line[] = ["fruit", "artisan"];

export default function ShopPage() {
	return (
		<>
			<Section
				space="sm"
				width="wide"
				eyebrow="Shop"
				title="All blends"
				intro={
					<p>
						Every card shows the caffeine level and how sweet the blend is, so you can pick by time of day. Everything below arrives with the first
						batch.
					</p>
				}
			/>
			{ORDER.map((line) => (
				<Section key={line} id={line} width="wide" space="sm" title={LINES[line].name} intro={<p>{LINES[line].blurb}</p>} ruled>
					<ProductGrid products={getByLine(line)} />
					<div className="mt-8">
						<LinkButton href={LINES[line].path} variant="ghost">
							More about {LINES[line].name}
						</LinkButton>
					</div>
				</Section>
			))}
		</>
	);
}
