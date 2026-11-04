"use client";

import { useEffect, useId, useRef, useState } from "react";
import { CTA, NAV } from "@/lib/site";
import { LinkButton } from "@/components/ui/Button";
import { NavLink } from "./NavLink";

/** Disclosure menu for small screens. Closes when a link is chosen and on Escape. */
export function MobileNav() {
	const [open, setOpen] = useState(false);
	const id = useId();
	const button = useRef<HTMLButtonElement>(null);
	const close = () => setOpen(false);

	useEffect(() => {
		if (!open) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				setOpen(false);
				button.current?.focus();
			}
		};
		document.addEventListener("keydown", onKey);
		return () => document.removeEventListener("keydown", onKey);
	}, [open]);

	return (
		<div className="lg:hidden">
			<button
				ref={button}
				type="button"
				aria-expanded={open}
				aria-controls={id}
				onClick={() => setOpen((o) => !o)}
				className="-mr-2 flex size-11 items-center justify-center rounded-full text-ink"
			>
				<span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
				<svg aria-hidden="true" viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.5">
					{open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}
				</svg>
			</button>
			<div id={id} hidden={!open} className="absolute inset-x-0 top-full z-40 border-b border-line-rule bg-surface px-6 pt-4 pb-8 shadow-2xl">
				<nav aria-label="Main">
					<ul className="flex flex-col">
						{NAV.map((item) => (
							<li key={item.href} className="border-b border-line-rule">
								<NavLink href={item.href} onClick={close} className="block py-4 font-display text-2xl text-ink">
									{item.label}
								</NavLink>
							</li>
						))}
					</ul>
				</nav>
				<LinkButton href={CTA.href} onClick={close} className="mt-6 w-full">
					{CTA.label}
				</LinkButton>
			</div>
		</div>
	);
}
