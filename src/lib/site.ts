/*
 * Site-wide settings. Flip LAUNCHED to true when the Phase 0 site goes public:
 * that removes noindex and opens robots.txt and the sitemap to search engines.
 */
export const LAUNCHED = false;

export const SITE = {
	name: "Literally Fruit",
	url: "https://literallyfruit.com",
	tagline: "Real fruit. No sugar. A slower cup.",
	description:
		"Small-batch loose-leaf tea with real fruit, sweetened with stevia leaf instead of sugar. Fruit Teas and Artisan Infusions, blended by hand in Southwest Ohio.",
	announcement: "Small-batch tea, blended by hand in Southwest Ohio. First batch coming soon.",
	/** Shown in the footer once you decide which LLC operates the tea business. */
	legalName: "Literally Fruit, LLC" as string | undefined,
	social: [] as { label: string; href: string }[],
} as const;

export const NAV = [
	{ label: "Shop", href: "/shop" },
	{ label: "Artisan Infusions", href: "/shop/artisan-infusions" },
	{ label: "Brew Guide", href: "/brew" },
	{ label: "Journal", href: "/journal" },
	{ label: "Our Story", href: "/about" },
] as const;

export const FOOTER_NAV = [
	{
		heading: "Shop",
		links: [
			{ label: "All blends", href: "/shop" },
			{ label: "Fruit Teas", href: "/shop/fruit-teas" },
			{ label: "Artisan Infusions", href: "/shop/artisan-infusions" },
		],
	},
	{
		heading: "Learn",
		links: [
			{ label: "Brew Guide", href: "/brew" },
			{ label: "Journal", href: "/journal" },
			{ label: "Our Story", href: "/about" },
			{ label: "FAQ", href: "/faq" },
		],
	},
] as const;

export const CTA = { label: "Join the first batch", href: "/waitlist" } as const;
