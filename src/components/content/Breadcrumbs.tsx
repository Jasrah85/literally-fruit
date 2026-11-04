import Link from "next/link";
import { SITE } from "@/lib/site";
import { JsonLd } from "@/components/ui/JsonLd";

type Crumb = { label: string; href: string };

/** Visible trail plus BreadcrumbList structured data. The last crumb is the current page. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
	return (
		<nav aria-label="Breadcrumb" className="text-sm text-ink-muted">
			<JsonLd
				data={{
					"@context": "https://schema.org",
					"@type": "BreadcrumbList",
					itemListElement: items.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.label, item: `${SITE.url}${c.href}` })),
				}}
			/>
			<ol className="flex flex-wrap items-center gap-2">
				{items.map((c, i) => (
					<li key={c.href} className="flex items-center gap-2">
						{i < items.length - 1 ? (
							<>
								<Link href={c.href} className="hover:text-ink hover:underline hover:underline-offset-4">
									{c.label}
								</Link>
								<span aria-hidden="true">/</span>
							</>
						) : (
							<span aria-current="page" className="text-ink">
								{c.label}
							</span>
						)}
					</li>
				))}
			</ol>
		</nav>
	);
}
