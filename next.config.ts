import type { NextConfig } from "next";
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

export default nextConfig;

// Enable calling `getCloudflareContext()` in `next dev`.
// See https://opennext.js.org/cloudflare/bindings#local-access-to-bindings.
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
