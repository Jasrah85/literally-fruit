import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getProductSlugs } from "@/lib/catalog";
import { WaitlistInput, type WaitlistResponse } from "@/lib/waitlist";

/*
 * POST /api/waitlist
 *
 * Until an email provider is chosen, signups are stored in Cloudflare KV
 * (binding LF_KV) under signup:<email>. When you pick Kit or Buttondown,
 * replace saveSignup() with a call to the provider; nothing else changes.
 *
 * Protection: a honeypot field, Cloudflare Turnstile (when TURNSTILE_SECRET_KEY
 * is set), and a per-IP limit of 5 signups an hour (when LF_KV is bound).
 */

type Env = {
	LF_KV?: KVNamespace;
	TURNSTILE_SECRET_KEY?: string;
};

const RATE_LIMIT = 5;

function json(body: WaitlistResponse, status = 200) {
	return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
	let raw: unknown;
	try {
		raw = await request.json();
	} catch {
		return json({ ok: false, error: "Something went wrong. Please try again." }, 400);
	}

	const parsed = WaitlistInput.safeParse(raw);
	if (!parsed.success) {
		const issue = parsed.error.issues[0];
		const field = issue?.path[0] === "email" || issue?.path[0] === "state" ? issue.path[0] : undefined;
		return json({ ok: false, error: issue?.message ?? "Check the form and try again.", field }, 400);
	}
	const input = parsed.data;

	// Bots fill every field. Pretend it worked so they don't adapt.
	if (input.company) return json({ ok: true });

	const { env } = getCloudflareContext() as unknown as { env: Env };
	const ip = request.headers.get("cf-connecting-ip") ?? "unknown";

	if (env.TURNSTILE_SECRET_KEY) {
		const verified = await verifyTurnstile(env.TURNSTILE_SECRET_KEY, input.token, ip);
		if (!verified) return json({ ok: false, error: "We couldn't verify you're human. Please try again." }, 400);
	}

	if (!env.LF_KV) {
		return json({ ok: false, error: "Signups open very soon. Please check back in a few days." }, 503);
	}

	const bucket = `rl:${ip}:${Math.floor(Date.now() / 3_600_000)}`;
	const count = Number((await env.LF_KV.get(bucket)) ?? 0);
	if (count >= RATE_LIMIT) {
		return json({ ok: false, error: "Too many signups from this connection. Please try again later." }, 429);
	}
	await env.LF_KV.put(bucket, String(count + 1), { expirationTtl: 3600 });

	const known = new Set(getProductSlugs());
	await saveSignup(env.LF_KV, {
		email: input.email.trim().toLowerCase(),
		state: input.state,
		flavors: input.flavors.filter((f) => known.has(f)),
		source: input.source,
	});

	return json({ ok: true });
}

type Signup = { email: string; state: string; flavors: string[]; source: string };

async function saveSignup(kv: KVNamespace, s: Signup) {
	const key = `signup:${s.email}`;
	const now = new Date().toISOString();
	const prior = await kv.get<Signup & { createdAt: string; sources: string[] }>(key, "json");
	const record = {
		email: s.email,
		state: s.state,
		flavors: [...new Set([...(prior?.flavors ?? []), ...s.flavors])],
		sources: [...new Set([...(prior?.sources ?? []), s.source])],
		createdAt: prior?.createdAt ?? now,
		updatedAt: now,
	};
	await kv.put(key, JSON.stringify(record));
}

async function verifyTurnstile(secret: string, token: string | undefined, ip: string): Promise<boolean> {
	if (!token) return false;
	const body = new FormData();
	body.append("secret", secret);
	body.append("response", token);
	if (ip !== "unknown") body.append("remoteip", ip);
	try {
		const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body });
		const data = (await res.json()) as { success?: boolean };
		return data.success === true;
	} catch {
		return false;
	}
}
