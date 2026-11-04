import Link from "next/link";
import { FOOTER_NAV, SITE } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { EmailSignup } from "@/components/marketing/EmailSignup";
import { Wordmark } from "./Wordmark";

export function SiteFooter() {
	const year = new Date().getFullYear();
	return (
		<footer className="border-t border-line-rule bg-surface-raised">
			<Container width="wide" className="grid gap-12 py-16 lg:grid-cols-[1.2fr_1fr_1fr_1.6fr]">
				<div>
					<Wordmark />
					<p className="mt-4 max-w-[30ch] text-sm leading-relaxed text-ink-muted">{SITE.description}</p>
				</div>
				{FOOTER_NAV.map((group) => (
					<nav key={group.heading} aria-label={group.heading}>
						<h2 className="text-xs font-semibold tracking-[0.16em] text-ink-muted uppercase">{group.heading}</h2>
						<ul className="mt-4 flex flex-col gap-2.5 text-[0.9375rem]">
							{group.links.map((l) => (
								<li key={l.href}>
									<Link href={l.href} className="hover:underline hover:underline-offset-4">
										{l.label}
									</Link>
								</li>
							))}
						</ul>
					</nav>
				))}
				<div>
					<h2 className="text-xs font-semibold tracking-[0.16em] text-ink-muted uppercase">Get the first batch</h2>
					<p className="mt-4 mb-4 text-sm text-ink-muted">Launch news and first-batch access. A few emails a season.</p>
					<EmailSignup compact source="footer" />
				</div>
			</Container>
			<Container width="wide" className="flex flex-col gap-2 border-t border-line-rule py-6 text-xs text-ink-muted sm:flex-row sm:justify-between">
				<p>
					© {year} {SITE.legalName ?? SITE.name}
				</p>
				<p>Blended by hand in Southwest Ohio.</p>
			</Container>
		</footer>
	);
}
