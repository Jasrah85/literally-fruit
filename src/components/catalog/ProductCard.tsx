import Link from "next/link";
import { displayName, formatPrice, lowestPrice, type Product } from "@/lib/catalog";
import { LineTheme } from "@/components/ui/LineTheme";
import { BrandImage } from "@/components/ui/BrandImage";
import { StatusBadge } from "@/components/ui/Badge";
import { CaffeineMeter } from "./CaffeineMeter";
import { SweetnessIndicator } from "./SweetnessIndicator";

/**
 * Themes itself to the product's line and cup color, so it can sit in a mixed
 * grid. The whole card is one link; the name is the accessible link text.
 */
export function ProductCard({ product: p, priority }: { product: Product; priority?: boolean }) {
	const price = lowestPrice(p);
	const href = `/products/${p.slug}`;
	return (
		<LineTheme
			line={p.line}
			blend={p.cupColor}
			as="article"
			className="group relative flex flex-col rounded-[0.625rem] border border-line-rule p-3 transition-colors hover:border-ink/40"
		>
			<BrandImage product={p} priority={priority} />
			<div className="flex flex-1 flex-col gap-3 px-2 pt-4 pb-2">
				<div className="flex items-start justify-between gap-3">
					<h3 className="font-display text-2xl leading-tight font-medium tracking-(--lf-display-tracking)">
						<Link href={href} className="after:absolute after:inset-0 after:rounded-[0.625rem] focus-visible:outline-none">
							{displayName(p)}
						</Link>
					</h3>
					<span aria-hidden="true" className="mt-2 size-3 shrink-0 rounded-full bg-blend ring-1 ring-ink/30" title="Cup color" />
				</div>
				<p className="text-[0.9375rem] leading-snug text-pretty text-ink-muted">{p.tagline}</p>
				<div className="mt-auto flex flex-col gap-1.5 pt-2">
					<CaffeineMeter level={p.caffeine} />
					<SweetnessIndicator sweetness={p.sweetness} sweeteners={p.sweeteners} />
				</div>
				<div className="flex items-center justify-between border-t border-line-rule pt-3">
					{price !== undefined && p.status === "available" ? (
						<span className="font-semibold">From {formatPrice(price)}</span>
					) : (
						<StatusBadge status={p.status} />
					)}
					<span className="text-xs tracking-[0.12em] text-ink-muted uppercase">{p.line === "artisan" ? "Artisan Infusions" : "Fruit Teas"}</span>
				</div>
			</div>
		</LineTheme>
	);
}
