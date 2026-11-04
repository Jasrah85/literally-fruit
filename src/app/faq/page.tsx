import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { LinkButton } from "@/components/ui/Button";
import { FAQAccordion } from "@/components/content/FAQAccordion";
import { FAQ } from "@/content/faq";

export const metadata: Metadata = {
	title: "FAQ",
	description: "Ordering, shipping, caffeine, stevia, storage, and allergens: answers about Literally Fruit teas.",
	alternates: { canonical: "/faq" },
};

export default function FAQPage() {
	return (
		<Section eyebrow="FAQ" title="Questions, answered" width="content">
			<FAQAccordion items={FAQ} />
			<div className="mt-12">
				<LinkButton href="/waitlist" variant="secondary">
					Join the waitlist
				</LinkButton>
			</div>
		</Section>
	);
}
