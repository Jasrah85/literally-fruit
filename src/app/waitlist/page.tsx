import type { Metadata } from "next";
import { displayName, getProducts } from "@/lib/catalog";
import { Section } from "@/components/ui/Section";
import { EmailSignup } from "@/components/marketing/EmailSignup";

export const metadata: Metadata = {
	title: "Join the first batch",
	description: "Get launch news and first-batch access to Literally Fruit teas.",
	alternates: { canonical: "/waitlist" },
};

const PERKS = [
	"First access to the first batch, before it's announced anywhere else",
	"Tasting-party results, and which recipes made the cut",
	"A look at the hand-drawn label art as each one is finished",
];

export default function WaitlistPage() {
	const flavors = getProducts().map((p) => ({ slug: p.slug, name: displayName(p) }));
	return (
		<Section
			eyebrow="Waitlist"
			title="Join the first batch"
			intro={<p>The first pouches will be small batches, and they&rsquo;ll go to this list first.</p>}
			width="content"
		>
			<div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
				<ul className="flex flex-col gap-4 text-lg">
					{PERKS.map((p) => (
						<li key={p} className="flex gap-3 border-t border-line-rule pt-4 text-pretty">
							<span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-ink" />
							{p}
						</li>
					))}
				</ul>
				<EmailSignup source="waitlist" flavors={flavors} />
			</div>
		</Section>
	);
}
