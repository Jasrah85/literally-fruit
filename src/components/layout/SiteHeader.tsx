import { CTA, NAV } from "@/lib/site";
import { LinkButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { MobileNav } from "./MobileNav";
import { NavLink } from "./NavLink";
import { Wordmark } from "./Wordmark";

export function SiteHeader() {
	return (
		<header className="relative z-30 border-b border-line-rule bg-surface">
			<Container width="wide" className="flex h-18 items-center justify-between gap-8">
				<Wordmark />
				<nav aria-label="Main" className="hidden lg:block">
					<ul className="flex items-center gap-8 text-[0.9375rem] text-ink-muted">
						{NAV.map((item) => (
							<li key={item.href}>
								<NavLink href={item.href}>{item.label}</NavLink>
							</li>
						))}
					</ul>
				</nav>
				<div className="flex items-center gap-3">
					{/* Cart icon arrives here in Stage D. */}
					<span className="hidden sm:block">
						<LinkButton href={CTA.href} size="sm">
							{CTA.label}
						</LinkButton>
					</span>
					<MobileNav />
				</div>
			</Container>
		</header>
	);
}
