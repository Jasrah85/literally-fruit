import { JsonLd } from "@/components/ui/JsonLd";

export type QA = { q: string; a: string };

/** Native details/summary: keyboard and screen-reader friendly with no JavaScript. Emits FAQPage data. */
export function FAQAccordion({ items, structuredData = true }: { items: QA[]; structuredData?: boolean }) {
	return (
		<div className="border-t border-line-rule">
			{structuredData && (
				<JsonLd
					data={{
						"@context": "https://schema.org",
						"@type": "FAQPage",
						mainEntity: items.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } })),
					}}
				/>
			)}
			{items.map((item) => (
				<details key={item.q} className="group border-b border-line-rule">
					<summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-display text-xl font-medium [&::-webkit-details-marker]:hidden">
						{item.q}
						<span aria-hidden="true" className="text-2xl leading-none text-ink-muted transition-transform group-open:rotate-45">
							+
						</span>
					</summary>
					<p className="max-w-[65ch] pb-6 leading-relaxed text-pretty text-ink-muted">{item.a}</p>
				</details>
			))}
		</div>
	);
}
