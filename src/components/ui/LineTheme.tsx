import type { CSSProperties, ReactNode } from "react";
import type { Line } from "@/lib/catalog";
import { cn } from "@/lib/cn";

type Props = {
	line: Line;
	/** A blend's cupColor. Exposed as --lf-blend (bg-blend, text-blend, etc.). */
	blend?: string;
	as?: "div" | "section" | "article" | "main" | "aside";
	className?: string;
	children: ReactNode;
};

/**
 * Switches everything inside it to a line's palette. Semantic utilities like
 * bg-surface, text-ink, and bg-accent pick up the new values automatically.
 */
export function LineTheme({ line, blend, as: Tag = "div", className, children }: Props) {
	const style = blend ? ({ "--lf-blend": blend } as CSSProperties) : undefined;
	return (
		<Tag data-line={line} style={style} className={cn(className)}>
			{children}
		</Tag>
	);
}
