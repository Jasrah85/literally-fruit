/*
 * One place for analytics calls, so swapping or adding a tool is a one-file change.
 * Sends to Google Analytics 4 when NEXT_PUBLIC_GA_ID is set at build time; otherwise a no-op.
 * Never pass email addresses or other personal details as event params.
 */
type Params = Record<string, string | number | boolean | undefined>;

declare global {
	interface Window {
		gtag?: (...args: unknown[]) => void;
	}
}

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export function track(event: string, params: Params = {}) {
	if (typeof window === "undefined" || !window.gtag) return;
	window.gtag("event", event, params);
}
