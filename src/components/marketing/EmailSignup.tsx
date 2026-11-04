"use client";

import { useCallback, useId, useState, type FormEvent } from "react";
import { US_STATES } from "@/lib/us-states";
import type { WaitlistResponse } from "@/lib/waitlist";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { track } from "@/lib/analytics";
import { Turnstile, TURNSTILE_ENABLED } from "./Turnstile";

type Flavor = { slug: string; name: string };

type Props = {
	/** Where the form lives, stored with the signup (footer, home, waitlist, product:<slug>). */
	source: string;
	/** Smaller layout for the footer. */
	compact?: boolean;
	/** Offer flavor checkboxes. */
	flavors?: Flavor[];
	/** Pre-select one flavor, e.g. on a product page. */
	preselect?: string;
	submitLabel?: string;
	className?: string;
};

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "done" } | { kind: "error"; message: string; field?: "email" | "state" };

const field =
	"h-11 w-full rounded-md border border-ink/30 bg-surface px-3 text-[0.9375rem] text-ink placeholder:text-ink-muted/80 focus:border-ink focus:outline-none aria-[invalid=true]:border-accent";

export function EmailSignup({ source, compact, flavors, preselect, submitLabel = "Join the first batch", className }: Props) {
	const id = useId();
	const [status, setStatus] = useState<Status>({ kind: "idle" });
	const [token, setToken] = useState<string | undefined>();
	const [resetKey, setResetKey] = useState(0);
	const onToken = useCallback((t: string | undefined) => setToken(t), []);

	async function submit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const form = new FormData(e.currentTarget);
		if (TURNSTILE_ENABLED && !token) {
			setStatus({ kind: "error", message: "One moment: we're checking that you're human." });
			return;
		}
		setStatus({ kind: "sending" });
		try {
			const res = await fetch("/api/waitlist", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					email: form.get("email"),
					state: form.get("state"),
					flavors: form.getAll("flavors"),
					company: form.get("company"),
					source,
					token,
				}),
			});
			const data = (await res.json()) as WaitlistResponse;
			if (data.ok) {
				setStatus({ kind: "done" });
				// GA4's recommended sign-up event. State and source only, never the email.
				track("sign_up", { method: "waitlist", state: String(form.get("state")), source, flavor_count: form.getAll("flavors").length });
			}
			else {
				setStatus({ kind: "error", message: data.error, field: data.field });
				setResetKey((k) => k + 1);
			}
		} catch {
			setStatus({ kind: "error", message: "Something went wrong. Please try again." });
			setResetKey((k) => k + 1);
		}
	}

	if (status.kind === "done") {
		return (
			<div role="status" className={cn("rounded-md border border-line-rule p-5", className)}>
				<p className="font-display text-xl">You&rsquo;re on the list.</p>
				<p className="mt-1 text-sm text-ink-muted">We&rsquo;ll email you when the first batch is ready, before anyone else hears about it.</p>
			</div>
		);
	}

	const err = status.kind === "error" ? status : undefined;
	return (
		<form onSubmit={submit} noValidate className={cn("flex flex-col gap-3", className)}>
			<div className={cn("grid gap-3", !compact && "sm:grid-cols-[1fr_12rem]")}>
				<div>
					<label htmlFor={`${id}-email`} className={cn("mb-1.5 block text-sm font-medium", compact && "sr-only")}>
						Email
					</label>
					<input
						id={`${id}-email`}
						name="email"
						type="email"
						autoComplete="email"
						required
						placeholder="you@example.com"
						aria-invalid={err?.field === "email" || undefined}
						aria-describedby={err ? `${id}-error` : undefined}
						className={field}
					/>
				</div>
				<div>
					<label htmlFor={`${id}-state`} className={cn("mb-1.5 block text-sm font-medium", compact && "sr-only")}>
						State
					</label>
					<select
						id={`${id}-state`}
						name="state"
						required
						defaultValue=""
						autoComplete="address-level1"
						aria-invalid={err?.field === "state" || undefined}
						aria-describedby={err ? `${id}-error` : undefined}
						className={field}
					>
						<option value="" disabled>
							Your state
						</option>
						{US_STATES.map(([code, name]) => (
							<option key={code} value={code}>
								{name}
							</option>
						))}
					</select>
				</div>
			</div>

			{flavors && flavors.length > 0 && (
				<fieldset className="mt-1">
					<legend className="mb-2 text-sm font-medium">
						Blends you&rsquo;d like to try <span className="font-normal text-ink-muted">(optional)</span>
					</legend>
					<div className="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
						{flavors.map((f) => (
							<label key={f.slug} className="flex items-center gap-2.5 text-sm">
								<input type="checkbox" name="flavors" value={f.slug} defaultChecked={f.slug === preselect} className="size-4 accent-(--lf-accent)" />
								{f.name}
							</label>
						))}
					</div>
				</fieldset>
			)}
			{!flavors && preselect && <input type="hidden" name="flavors" value={preselect} />}

			{/* Honeypot: hidden from people and screen readers, irresistible to bots. */}
			<div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
				<label>
					Company
					<input type="text" name="company" tabIndex={-1} autoComplete="off" />
				</label>
			</div>

			<Turnstile onToken={onToken} resetKey={resetKey} />

			<Button type="submit" disabled={status.kind === "sending"} className={cn(compact ? "w-full" : "self-start")}>
				{status.kind === "sending" ? "Joining…" : submitLabel}
			</Button>
			<p id={`${id}-error`} role="alert" className="min-h-5 text-sm text-ink">
				{err?.message}
			</p>
			{!compact && <p className="text-xs text-ink-muted">We&rsquo;ll only email you about Literally Fruit. Unsubscribe anytime.</p>}
		</form>
	);
}
