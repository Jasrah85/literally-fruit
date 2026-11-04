import { SWEETNESS_LABEL, type Product } from "@/lib/catalog";
import { cn } from "@/lib/cn";

const SWEETENER_NAME = { "stevia-leaf": "stevia leaf", "stevia-extract": "stevia", "monk-fruit": "monk fruit" } as const;

/** Three dots plus a text label naming the sweetener, e.g. "Lightly sweet · stevia leaf". */
export function SweetnessIndicator({
	sweetness,
	sweeteners,
	className,
}: Pick<Product, "sweetness" | "sweeteners"> & { className?: string }) {
	const label = SWEETNESS_LABEL[sweetness];
	const what = sweeteners.map((s) => SWEETENER_NAME[s]).join(" + ");
	return (
		<span className={cn("inline-flex items-center gap-2 text-sm text-ink-muted", className)}>
			<span aria-hidden="true" className="flex gap-[3px]">
				{[1, 2, 3].map((n) => (
					<span key={n} className={cn("size-[7px] rounded-full", n <= sweetness ? "bg-ink" : "border border-ink/35")} />
				))}
			</span>
			{what ? `${label} · ${what}` : label}
		</span>
	);
}
