import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SITE } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { BrandImage } from "@/components/ui/BrandImage";
import { JsonLd } from "@/components/ui/JsonLd";
import { LinkButton } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/content/Breadcrumbs";
import { getPost, POSTS } from "@/content/journal/posts";
import { formatDate } from "@/lib/dates";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
	return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
	const post = getPost((await params).slug);
	if (!post) return {};
	return {
		title: post.title,
		description: post.description,
		alternates: { canonical: `/journal/${post.slug}` },
		openGraph: { type: "article", title: post.title, description: post.description, publishedTime: post.date },
	};
}

export default async function JournalPost({ params }: Params) {
	const post = getPost((await params).slug);
	if (!post) notFound();
	const { default: Body } = await post.load();

	return (
		<article>
			<JsonLd
				data={{
					"@context": "https://schema.org",
					"@type": "BlogPosting",
					headline: post.title,
					description: post.description,
					datePublished: post.date,
					publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
					mainEntityOfPage: `${SITE.url}/journal/${post.slug}`,
				}}
			/>
			<Container width="prose" className="pt-8">
				<Breadcrumbs
					items={[
						{ label: "Journal", href: "/journal" },
						{ label: post.title, href: `/journal/${post.slug}` },
					]}
				/>
				<header className="mt-10">
					<time dateTime={post.date} className="text-sm text-ink-muted">
						{formatDate(post.date)}
					</time>
					<h1 className="mt-3 font-display text-5xl leading-[1.02] font-medium text-balance sm:text-6xl">{post.title}</h1>
					<p className="mt-5 text-xl text-pretty text-ink-muted">{post.description}</p>
				</header>
			</Container>
			<Container width="content" className="mt-10">
				<BrandImage src={`site/journal-${post.slug}`} alt="" label={post.title} tint={post.tint} ratio="16/9" priority sizes="(min-width: 1152px) 1100px, 92vw" />
			</Container>
			<Container width="prose" className="pb-20">
				<div className="mt-8 text-lg leading-relaxed text-pretty text-ink-muted">
					<Body />
				</div>
				<div className="mt-14 border-t border-line-rule pt-8">
					<LinkButton href="/journal" variant="ghost">
						More from the journal
					</LinkButton>
				</div>
			</Container>
		</article>
	);
}
