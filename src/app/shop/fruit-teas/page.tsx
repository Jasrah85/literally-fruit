import type { Metadata } from "next";
import { CollectionPage } from "@/components/catalog/CollectionPage";

export const metadata: Metadata = {
	title: "Fruit Teas",
	description: "Stevia-sweetened loose-leaf fruit teas with real fruit pieces: Cinnamon Apple, Cran-Pom, Blackberry Oolong, Strawberry Matcha, and more.",
	alternates: { canonical: "/shop/fruit-teas" },
};

export default function FruitTeasPage() {
	return (
		<CollectionPage
			line="fruit"
			title="Fruit Teas"
			intro={
				<p>
					Black, green, white, and herbal bases with fruit you can see in the pouch. Most are sweetened lightly with stevia leaf, and
					several share their flavors with our fruit wines.
				</p>
			}
			image={{ src: "site/fruit-teas-hero", alt: "Loose fruit tea with dried apple and cranberry pieces", label: "Fruit Teas", tint: "#9b1d33" }}
			storyTitle="How we sweeten"
			story={
				<>
					<p>
						We sweeten with cut stevia leaf, the dried herb itself, instead of sugar or a white extract powder. A little goes a long way, so a
						pouch tastes rounded rather than sugary, and you can add more sweetness in the cup if you like.
					</p>
					<p>
						Each product card shows how sweet a blend is and which sweetener it uses. Strawberry Matcha also uses a touch of monk fruit,
						because matcha needs a bit more sweetness to balance its bitterness.
					</p>
				</>
			}
		/>
	);
}
