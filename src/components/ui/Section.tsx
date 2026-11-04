import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container } from "./Container";

const spacing = {
	sm: "py-10 sm:py-14",
	md: "py-16 sm:py-24",
	lg: "py-24 sm:py-32",
} as const;

type Props = {
	/** Visible heading. Also labels the section for screen readers. */
	title?: string;
	eyebrow?: string;
	intro?: ReactNode;
	space?: keyof typeof spacing;
	width?: "prose" | "content" | "wide";
	/** Draw a hairline rule above the section. */
	ruled?: boolean;
	id?: string;
	className?: string;
	children: ReactNode;
};

export function Section({ title, eyebrow, intro, space = "md", width = "content", ruled, id, className, children }: Props) {
	const headingId = id && title ? `${id}-title` : undefined;
	return (
		<section id={id} aria-labelledby={headingId} className={cn(spacing[space], className)}>
			<Container width={width}>
				{(title || eyebrow || intro) && (
					<header className={cn("mb-10 max-w-[60ch]", ruled && "border-t border-line-rule pt-8")}>
						{eyebrow && <p className="mb-3 text-xs font-semibold tracking-[0.18em] text-ink-muted uppercase">{eyebrow}</p>}
						{title && (
							<h2 id={headingId} className="font-display text-4xl leading-[1.05] font-medium tracking-(--lf-display-tracking) text-balance sm:text-5xl">
								{title}
							</h2>
						)}
						{intro && <div className="mt-4 text-lg leading-relaxed text-pretty text-ink-muted">{intro}</div>}
					</header>
				)}
				{children}
			</Container>
		</section>
	);
}
