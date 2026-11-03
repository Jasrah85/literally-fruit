import type { MetadataRoute } from "next";

// Placeholder period: block all crawlers. Replace with real rules at launch.
export default function robots(): MetadataRoute.Robots {
	return {
		rules: { userAgent: "*", disallow: "/" },
	};
}
