import Link from "next/link";
import type { ReactNode } from "react";
import { displayName, getProduct } from "@/lib/catalog";

export function Callout({ title, children }: { title?: string; children: ReactNode }) {
	return (
		<aside className="mt-8 rounded-[0.625rem] border border-line-rule bg-surface-raised p-6 text-base">
			{title && <p className="mb-2 font-display text-xl text-ink">{title}</p>}
			<div className="[&>p:first-child]:mt-0">{children}</div>
		</aside>
	);
}

/** Links to a blend by slug and notes if it isn't out yet. Renders plain text if the slug is unknown. */
export function ProductMention({ slug }: { slug: string }) {
	const p = getProduct(slug);
	if (!p) return <span>{slug}</span>;
	return (
		<Link href={`/products/${p.slug}`} className="text-ink underline decoration-ink/40 underline-offset-4 hover:decoration-ink">
			{displayName(p)}
			{p.status === "coming-soon" && <span className="text-ink-muted"> (coming soon)</span>}
		</Link>
	);
}
