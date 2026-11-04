"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

declare global {
	interface Window {
		turnstile?: {
			render: (el: HTMLElement, opts: Record<string, unknown>) => string;
			reset: (id?: string) => void;
			remove: (id: string) => void;
		};
	}
}

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

/** Renders nothing unless NEXT_PUBLIC_TURNSTILE_SITE_KEY is set at build time. */
export function Turnstile({ onToken, resetKey }: { onToken: (token: string | undefined) => void; resetKey: number }) {
	const box = useRef<HTMLDivElement>(null);
	const widget = useRef<string | undefined>(undefined);
	// True if the script already loaded on an earlier page (client-side navigation).
	const [ready, setReady] = useState(() => typeof window !== "undefined" && Boolean(window.turnstile));

	useEffect(() => {
		if (!SITE_KEY || !ready || !box.current || !window.turnstile || widget.current) return;
		widget.current = window.turnstile.render(box.current, {
			sitekey: SITE_KEY,
			theme: "dark",
			size: "flexible",
			callback: (t: string) => onToken(t),
			"expired-callback": () => onToken(undefined),
			"error-callback": () => onToken(undefined),
		});
		return () => {
			if (widget.current) window.turnstile?.remove(widget.current);
			widget.current = undefined;
		};
	}, [ready, onToken]);

	useEffect(() => {
		if (resetKey && widget.current) window.turnstile?.reset(widget.current);
	}, [resetKey]);

	if (!SITE_KEY) return null;
	return (
		<>
			<Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" strategy="afterInteractive" onLoad={() => setReady(true)} />
			<div ref={box} className="min-h-[65px]" />
		</>
	);
}

export const TURNSTILE_ENABLED = Boolean(SITE_KEY);
