import type { CSSProperties } from "react";
import { displayName, type Product, type Shot } from "@/lib/catalog";
import { cn } from "@/lib/cn";
import { getImage, largestSrc, srcSet, type ImageEntry } from "@/lib/images";

const RATIOS = { "4/5": "aspect-[4/5]", "1/1": "aspect-square", "3/2": "aspect-[3/2]", "16/9": "aspect-video", "3/4": "aspect-[3/4]" } as const;

type Common = {
	ratio?: keyof typeof RATIOS;
	/** The `sizes` attribute. Default suits a card in a 3–4 column grid. */
	sizes?: string;
	/** Load eagerly with high priority. Use for the one above-the-fold image. */
	priority?: boolean;
	className?: string;
};

type Props = Common &
	(
		| { product: Product; shot?: Shot; alt?: string; src?: never; tint?: never; label?: never }
		| { src: string; alt: string; tint?: string; label?: string; product?: never; shot?: never }
	);

/**
 * Every image on the site goes through this component. It picks the best thing
 * that exists, in order:
 *
 *   1. A processed photo (blends/<slug>/<shot> or any manifest key)
 *   2. For products, the scanned label art (label-art/<slug>) on a label card
 *   3. A tinted placeholder in the blend's cup color, labeled with what belongs there
 *
 * The frame is always the same aspect ratio, so swapping in real photos never
 * shifts the layout.
 */
export function BrandImage(props: Props) {
	const { ratio = "4/5", sizes = "(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 90vw", priority, className } = props;
	const frame = cn("relative overflow-hidden rounded-label", RATIOS[ratio], className);

	if (props.product) {
		const p = props.product;
		const shot = props.shot ?? p.gallery[0] ?? "pouch";
		const name = displayName(p);
		const alt = props.alt ?? `${name}, ${shot === "cup" ? "brewed in a cup" : shot === "leaf" ? "loose blend" : shot}`;
		const photoKey = `blends/${p.slug}/${shot}`;
		const photo = getImage(photoKey);
		if (photo) return <Photo k={photoKey} entry={photo} alt={alt} sizes={sizes} priority={priority} className={frame} />;

		const artKey = `label-art/${p.slug}`;
		const art = getImage(artKey);
		if (art) {
			return (
				<div className={cn(frame, "bg-label p-[12%]")}>
					<Photo k={artKey} entry={art} alt={`${name} label art`} sizes={sizes} priority={priority} fit="contain" className="relative size-full" />
				</div>
			);
		}
		return <Placeholder tint={p.cupColor} title={name} caption={`Photo coming · ${shot}`} alt={alt} className={frame} />;
	}

	const entry = getImage(props.src);
	if (entry) return <Photo k={props.src} entry={entry} alt={props.alt} sizes={sizes} priority={priority} className={frame} />;
	return <Placeholder tint={props.tint} title={props.label ?? props.alt} caption={`Image coming · ${props.src}`} alt={props.alt} className={frame} />;
}

function Photo({
	k,
	entry,
	alt,
	sizes,
	priority,
	fit = "cover",
	className,
}: {
	k: string;
	entry: ImageEntry;
	alt: string;
	sizes: string;
	priority?: boolean;
	fit?: "cover" | "contain";
	className?: string;
}) {
	const blur: CSSProperties | undefined = entry.alpha
		? undefined
		: { backgroundImage: `url(${entry.blurDataURL})`, backgroundSize: "cover", backgroundPosition: "center" };
	return (
		<div className={className} style={blur}>
			<picture>
				<source type="image/avif" srcSet={srcSet(k, entry, "avif")} sizes={sizes} />
				{/* Pre-sized by scripts/build-images.ts, so next/image's optimizer isn't needed. */}
				<img
					src={largestSrc(k, entry)}
					srcSet={srcSet(k, entry, "webp")}
					sizes={sizes}
					width={entry.width}
					height={entry.height}
					alt={alt}
					loading={priority ? "eager" : "lazy"}
					fetchPriority={priority ? "high" : "auto"}
					decoding="async"
					className={cn("absolute inset-0 size-full", fit === "cover" ? "object-cover" : "object-contain")}
				/>
			</picture>
		</div>
	);
}

function Placeholder({ tint, title, caption, alt, className }: { tint?: string; title: string; caption: string; alt: string; className?: string }) {
	// Lift very dark cup colors (chicory, chaga) so the placeholder still reads on a dark surface.
	const color = `color-mix(in oklab, ${tint ?? "var(--lf-blend)"} 82%, var(--lf-ink) 18%)`;
	return (
		<div
			role="img"
			aria-label={alt}
			className={cn(className, "flex flex-col items-center justify-end bg-surface-raised p-5 text-center")}
			style={{
				backgroundImage: [
					`radial-gradient(120% 80% at 70% 18%, color-mix(in oklab, ${color} 85%, transparent) 0%, color-mix(in oklab, ${color} 35%, transparent) 45%, transparent 75%)`,
					"repeating-linear-gradient(135deg, transparent 0 11px, color-mix(in oklab, var(--lf-ink) 5%, transparent) 11px 12px)",
				].join(", "),
			}}
		>
			<span aria-hidden="true" className="absolute inset-3 rounded-[0.25rem] border border-ink/15" />
			<span aria-hidden="true" className="relative font-display text-xl leading-tight font-medium text-balance text-ink">
				{title}
			</span>
			<span aria-hidden="true" className="relative mt-1 text-[0.6875rem] tracking-[0.14em] text-ink-muted uppercase">
				{caption}
			</span>
		</div>
	);
}
