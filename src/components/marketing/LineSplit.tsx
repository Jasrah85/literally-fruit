import Link from "next/link";
import { LINES, getByLine, type Line } from "@/lib/catalog";
import { LineTheme } from "@/components/ui/LineTheme";

const ORDER: Line[] = ["fruit", "artisan"];

export function LineSplit() {
	return (
		<div className="grid gap-5 md:grid-cols-2">
			{ORDER.map((id) => {
				const line = LINES[id];
				const count = getByLine(id).length;
				return (
					<LineTheme key={id} line={id} as="article" className="group relative flex min-h-80 flex-col justify-between overflow-hidden rounded-[0.625rem] border border-line-rule p-8 sm:p-10">
						<div
							aria-hidden="true"
							className="absolute -top-24 -right-24 size-72 rounded-full opacity-40 blur-3xl transition-opacity group-hover:opacity-60"
							style={{ background: "var(--lf-accent)" }}
						/>
						<div className="relative">
							<p className="text-xs font-semibold tracking-[0.16em] text-ink-muted uppercase">{line.kicker}</p>
							<h3 className="mt-3 font-display text-4xl font-medium sm:text-5xl">
								<Link href={line.path} className="after:absolute after:inset-0">
									{line.name}
								</Link>
							</h3>
							<p className="mt-4 max-w-[38ch] text-pretty text-ink-muted">{line.blurb}</p>
						</div>
						<p className="relative mt-10 text-sm font-semibold">
							{count} blends <span aria-hidden="true">→</span>
						</p>
					</LineTheme>
				);
			})}
		</div>
	);
}
