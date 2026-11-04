import { Fragment, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Renders the small Markdown subset used in products.json: paragraphs
 * separated by blank lines, **bold**, and *italic*. Anything richer belongs in MDX.
 */
export function Prose({ text, className }: { text: string; className?: string }) {
	const paragraphs = text.trim().split(/\n\s*\n/);
	return (
		<div className={cn("flex flex-col gap-4 text-pretty", className)}>
			{paragraphs.map((p, i) => (
				<p key={i}>{inline(p.replace(/\n/g, " "))}</p>
			))}
		</div>
	);
}

function inline(s: string): ReactNode[] {
	return s.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).map((part, i) => {
		if (part.startsWith("**") && part.endsWith("**")) return <strong key={i}>{part.slice(2, -2)}</strong>;
		if (part.startsWith("*") && part.endsWith("*") && part.length > 2) return <em key={i}>{part.slice(1, -1)}</em>;
		return <Fragment key={i}>{part}</Fragment>;
	});
}
