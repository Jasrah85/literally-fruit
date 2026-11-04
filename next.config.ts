import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import { getRedirects } from "./src/lib/catalog";

const nextConfig: NextConfig = {
	images: {
		// Images are pre-sized by scripts/build-images.ts and served as static
		// files, so nothing depends on Cloudflare's paid image transformations.
		unoptimized: true,
	},
	// Renamed products: every slug in `previousSlugs` 301s to the current one.
	async redirects() {
		return getRedirects();
	},
};

// MDX for journal posts in src/content/journal.
const withMDX = createMDX({});

export default withMDX(nextConfig);

// Enable calling `getCloudflareContext()` in `next dev`.
// See https://opennext.js.org/cloudflare/bindings#local-access-to-bindings.
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
