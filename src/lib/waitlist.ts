import { z } from "zod";
import { STATE_CODES } from "./us-states";

/** Shared by the signup form and /api/waitlist. */
export const WaitlistInput = z.object({
	email: z.email("Enter a valid email address").max(254),
	state: z.enum(STATE_CODES, "Choose your state"),
	flavors: z.array(z.string().regex(/^[a-z0-9-]+$/)).max(20).default([]),
	source: z.string().max(40).default("unknown"),
	/** Honeypot. Real people never see or fill this field. */
	company: z.string().max(200).optional(),
	/** Cloudflare Turnstile token, when Turnstile is configured. */
	token: z.string().max(4096).optional(),
});

export type WaitlistInput = z.input<typeof WaitlistInput>;

export type WaitlistResponse = { ok: true } | { ok: false; error: string; field?: "email" | "state" };
