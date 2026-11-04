import { CAFFEINE_LABEL, type Caffeine } from "@/lib/catalog";
import { cn } from "@/lib/cn";

const LEVEL: Record<Caffeine, number> = { none: 0, low: 1, medium: 2, high: 3 };

/** Three bars plus a text label. The label carries the meaning; the bars are decoration. */
export function CaffeineMeter({ level, className }: { level: Caffeine; className?: string }) {
	const filled = LEVEL[level];
	return (
		<span className={cn("inline-flex items-center gap-2 text-sm text-ink-muted", className)}>
			<span aria-hidden="true" className="flex h-3.5 items-end gap-[3px]">
				{[1, 2, 3].map((n) => (
					<span
						key={n}
						className={cn("w-[5px] rounded-[1px]", n <= filled ? "bg-ink" : "border border-ink/35")}
						style={{ height: `${n * 33.3}%` }}
					/>
				))}
			</span>
			{CAFFEINE_LABEL[level]}
		</span>
	);
}
