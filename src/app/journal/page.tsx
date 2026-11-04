import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { BrandImage } from "@/components/ui/BrandImage";
import { POSTS } from "@/content/journal/posts";
import { formatDate } from "@/lib/dates";

export const metadata: Metadata = {
	title: "Journal",
	description: "Brewing notes, iced tea, evening rituals, and news from the farm.",
	alternates: { canonical: "/journal" },
};

export default function JournalIndex() {
	return (
		<Section eyebrow="Journal" title="Notes from the kettle" intro={<p>How to brew, what to pair, and what&rsquo;s happening on the farm.</p>} width="wide">
			<ul role="list" className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
				{POSTS.map((post) => (
					<li key={post.slug}>
						<article className="group relative flex flex-col gap-4">
							<BrandImage src={`site/journal-${post.slug}`} alt="" label={post.title} tint={post.tint} ratio="3/2" />
							<time dateTime={post.date} className="text-sm text-ink-muted">
								{formatDate(post.date)}
							</time>
							<h2 className="font-display text-2xl leading-tight font-medium text-balance">
								<Link href={`/journal/${post.slug}`} className="after:absolute after:inset-0">
									{post.title}
								</Link>
							</h2>
							<p className="text-pretty text-ink-muted">{post.description}</p>
						</article>
					</li>
				))}
			</ul>
		</Section>
	);
}
