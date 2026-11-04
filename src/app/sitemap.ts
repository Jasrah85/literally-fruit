import type { MetadataRoute } from "next";
import { getProducts } from "@/lib/catalog";
import { POSTS } from "@/content/journal/posts";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
	const page = (path: string, priority: number): MetadataRoute.Sitemap[number] => ({ url: `${SITE.url}${path}`, priority });
	return [
		page("/", 1),
		page("/shop", 0.9),
		page("/shop/fruit-teas", 0.9),
		page("/shop/artisan-infusions", 0.9),
		...getProducts().map((p) => page(`/products/${p.slug}`, 0.8)),
		page("/brew", 0.6),
		page("/about", 0.6),
		page("/faq", 0.5),
		page("/waitlist", 0.7),
		page("/journal", 0.5),
		...POSTS.filter((p) => !p.draft).map((p) => ({ url: `${SITE.url}/journal/${p.slug}`, lastModified: p.date, priority: 0.5 })),
	];
}
