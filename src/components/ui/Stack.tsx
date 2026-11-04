import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const gaps = { xs: "gap-1", sm: "gap-2", md: "gap-4", lg: "gap-8", xl: "gap-12" } as const;

/** Vertical (default) or horizontal flow with consistent gaps. */
export function Stack({
	direction = "col",
	gap = "md",
	className,
	children,
}: {
	direction?: "col" | "row";
	gap?: keyof typeof gaps;
	className?: string;
	children: ReactNode;
}) {
	return <div className={cn("flex", direction === "col" ? "flex-col" : "flex-row flex-wrap items-center", gaps[gap], className)}>{children}</div>;
}
