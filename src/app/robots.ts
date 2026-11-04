import type { MetadataRoute } from "next";
import { LAUNCHED, SITE } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
	if (!LAUNCHED) return { rules: { userAgent: "*", disallow: "/" } };
	return {
		rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/dev/"] },
		sitemap: `${SITE.url}/sitemap.xml`,
	};
}
