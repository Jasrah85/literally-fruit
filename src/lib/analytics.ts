/*
 * One place for analytics calls, so swapping or adding a tool is a one-file change.
 *
 * NEXT_PUBLIC_GA_ID (set as a Worker *build* variable) accepts either:
 *   - a GA4 measurement ID (G-XXXXXXX): loads gtag.js directly, or
 *   - a Tag Manager container ID (GTM-XXXXXXX): loads GTM; configure the GA4
 *     tag and any others inside Tag Manager.
 * Never pass email addresses or other personal details as event params.
 */
type Params = Record<string, string | number | boolean | undefined>;

declare global {
	interface Window {
		gtag?: (...args: unknown[]) => void;
		dataLayer?: unknown[];
	}
}

export const TAG_ID = process.env.NEXT_PUBLIC_GA_ID?.trim() || undefined;
export const USES_GTM = Boolean(TAG_ID?.startsWith("GTM-"));

export function track(event: string, params: Params = {}) {
	if (typeof window === "undefined") return;
	if (!USES_GTM && window.gtag) {
		window.gtag("event", event, params);
		return;
	}
	// Tag Manager: a GA4 Event tag with a Custom Event trigger named `event` picks this up.
	window.dataLayer?.push({ event, ...params });
}
