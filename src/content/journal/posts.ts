import type { ComponentType } from "react";

export type Post = {
	slug: string;
	title: string;
	description: string;
	/** ISO date, YYYY-MM-DD. */
	date: string;
	/** Placeholder tint until the post has a photo at site/journal-<slug>. */
	tint: string;
	draft?: boolean;
	load: () => Promise<{ default: ComponentType }>;
};

/** Newest first. Add a post: write <slug>.mdx in this folder, then add an entry here. */
export const POSTS: Post[] = [
	{
		slug: "iced-fruit-tea",
		title: "How to make iced fruit tea, two ways",
		description: "Hot-brewed over ice or cold-brewed overnight: when to use each, and which blends suit them.",
		date: "2026-11-03",
		tint: "#34428f",
		draft: true,
		load: () => import("./iced-fruit-tea.mdx"),
	},
	{
		slug: "end-of-the-day-cup",
		title: "A cup for the end of the day",
		description: "Caffeine-free blends for the evening, and a small ritual for making the last cup.",
		date: "2026-11-02",
		tint: "#c06a2b",
		draft: true,
		load: () => import("./end-of-the-day-cup.mdx"),
	},
];

export function getPost(slug: string) {
	return POSTS.find((p) => p.slug === slug);
}
