"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

/** Marks the current section with aria-current and an underline. */
export function NavLink({ href, className, children, onClick }: { href: string; className?: string; children: React.ReactNode; onClick?: () => void }) {
	const path = usePathname();
	const active = href === "/shop" ? path === "/shop" || path === "/shop/fruit-teas" : path === href || path.startsWith(`${href}/`);
	return (
		<Link
			href={href}
			onClick={onClick}
			aria-current={active ? "page" : undefined}
			className={cn(
				"underline-offset-[6px] transition-colors hover:text-ink aria-[current=page]:text-ink aria-[current=page]:underline",
				className,
			)}
		>
			{children}
		</Link>
	);
}
