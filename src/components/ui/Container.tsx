import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const widths = {
	prose: "max-w-[68ch]",
	content: "max-w-6xl",
	wide: "max-w-[90rem]",
} as const;

export function Container({
	width = "content",
	className,
	children,
}: {
	width?: keyof typeof widths;
	className?: string;
	children: ReactNode;
}) {
	return <div className={cn("mx-auto w-full px-6 sm:px-10 lg:px-16", widths[width], className)}>{children}</div>;
}
