import type { ReactNode } from "react";
import { LINES, getByLine, type Line } from "@/lib/catalog";
import { LineTheme } from "@/components/ui/LineTheme";
import { Section } from "@/components/ui/Section";
import { Hero } from "@/components/marketing/Hero";
import { EmailSignup } from "@/components/marketing/EmailSignup";
import { ProductGrid } from "./ProductGrid";
import { SEASON_LABEL, SEASON_ORDER } from "./season";

type Props = {
	line: Line;
	title: ReactNode;
	intro: ReactNode;
	story: ReactNode;
	storyTitle: string;
	image: { src: string; alt: string; label: string; tint: string };
};

/** Shared layout for /shop/fruit-teas and /shop/artisan-infusions, themed to the line. */
export function CollectionPage({ line, title, intro, story, storyTitle, image }: Props) {
	const products = getByLine(line);
	const info = LINES[line];
	const seasons = SEASON_ORDER.filter((s) => products.some((p) => p.season === s));

	return (
		<LineTheme line={line}>
			<Hero eyebrow={info.kicker} title={title} intro={intro} image={{ ...image, ratio: "1/1" }} />
			{seasons.map((season) => (
				<Section key={season} id={season} title={SEASON_LABEL[season]} width="wide" space="sm" ruled>
					<ProductGrid products={products.filter((p) => p.season === season)} />
				</Section>
			))}
			<Section title={storyTitle} width="prose" ruled>
				<div className="flex flex-col gap-4 text-lg leading-relaxed text-pretty text-ink-muted">{story}</div>
			</Section>
			<Section title="Be first in line" intro={<p>{info.name} launch with the first batch. Join the list and we&rsquo;ll email you before anyone else.</p>} ruled>
				<EmailSignup source={`collection:${line}`} />
			</Section>
		</LineTheme>
	);
}
