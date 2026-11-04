import Link from "next/link";
import { cn } from "@/lib/cn";

export function Wordmark({ className }: { className?: string }) {
	return (
		<Link href="/" className={cn("font-display text-[1.65rem] leading-none font-medium tracking-[-0.01em] whitespace-nowrap", className)}>
			Literally Fruit
			<span className="sr-only"> home</span>
		</Link>
	);
}
