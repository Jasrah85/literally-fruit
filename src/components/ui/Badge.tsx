import type { ReactNode } from "react";
import { LINES, type Line, type Status } from "@/lib/catalog";
import { cn } from "@/lib/cn";

const tones = {
	neutral: "border-line-rule text-ink-muted",
	accent: "border-transparent bg-accent text-accent-ink",
	label: "border-transparent bg-label text-label-ink",
	outline: "border-ink/40 text-ink",
} as const;

export function Badge({ tone = "neutral", className, children }: { tone?: keyof typeof tones; className?: string; children: ReactNode }) {
	return (
		<span
			className={cn(
				"inline-flex h-6 items-center rounded-full border px-2.5 text-[0.6875rem] font-semibold tracking-[0.12em] whitespace-nowrap uppercase",
				tones[tone],
				className,
			)}
		>
			{children}
		</span>
	);
}

export function LineBadge({ line }: { line: Line }) {
	return <Badge tone="outline">{LINES[line].name}</Badge>;
}

const STATUS: Partial<Record<Status | "sold-out", { text: string; tone: keyof typeof tones }>> = {
	"coming-soon": { text: "Coming soon", tone: "label" },
	"seasonal-off": { text: "Out of season", tone: "neutral" },
	"sold-out": { text: "Sold out", tone: "neutral" },
	hidden: { text: "Hidden", tone: "neutral" },
};

/** Nothing renders for available products. `soldOut` comes from Square stock in Stage D. */
export function StatusBadge({ status, soldOut }: { status: Status; soldOut?: boolean }) {
	const entry = STATUS[soldOut && status === "available" ? "sold-out" : status];
	return entry ? <Badge tone={entry.tone}>{entry.text}</Badge> : null;
}
