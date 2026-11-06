import type { Metadata } from "next";
import { CollectionPage } from "@/components/catalog/CollectionPage";

export const metadata: Metadata = {
	title: "Artisan Infusions",
	description: "Numbered, apothecary-style herbal blends from Literally Fruit: tulsi and rose, linden and mint, rooibos and pear, honeybush and saffron.",
	alternates: { canonical: "/shop/artisan-infusions" },
};

export default function ArtisanInfusionsPage() {
	return (
		<CollectionPage
			line="artisan"
			title={
				<>
					Artisan
					<br />
					Infusions
				</>
			}
			intro={
				<p>
					An apothecary line from Literally Fruit. Numbered herbal blends built on botanicals instead of fruit, made for the slow parts of the day: the end of
					work, a long evening, the last cup before the house goes quiet.
				</p>
			}
			image={{ src: "site/artisan-hero", alt: "Dried botanicals and a glass jar on a dark wooden shelf", label: "Artisan Infusions", tint: "#c4a062" }}
			storyTitle="About the botanicals"
			story={
				<>
					<p>
						Each Artisan Infusion is built around one or two herbs with real character, like Kapoor tulsi, linden flower, honeybush, or wild
						chaga, with softer botanicals and spices to round them out. Where fruit appears, it&rsquo;s a supporting note, never the point.
					</p>
					<p>
						They&rsquo;re numbered the way an apothecary numbers its jars, and each has its own hand-drawn label. Most are caffeine-free and
						unsweetened, so the herbs speak for themselves. A spoonful of honey is always welcome.
					</p>
				</>
			}
		/>
	);
}
