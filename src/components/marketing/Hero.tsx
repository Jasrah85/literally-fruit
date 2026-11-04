import type { ReactNode } from "react";
import { BrandImage } from "@/components/ui/BrandImage";
import { Container } from "@/components/ui/Container";

type Props = {
	eyebrow?: string;
	title: ReactNode;
	intro: ReactNode;
	actions?: ReactNode;
	/** Manifest key for the hero image, e.g. "site/home-hero". */
	image?: { src: string; alt: string; label?: string; tint?: string; ratio?: "4/5" | "1/1" };
	/** The slow color bloom from the placeholder page. */
	glow?: boolean;
};

export function Hero({ eyebrow, title, intro, actions, image, glow }: Props) {
	return (
		<section className="relative isolate overflow-hidden">
			{glow && (
				<div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,#000_65%,transparent)]">
					<div className="infusion" />
				</div>
			)}
			<Container width="wide" className="grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.15fr_1fr] lg:py-28">
				<div>
					{eyebrow && <p className="mb-5 text-xs font-semibold tracking-[0.18em] text-ink-muted uppercase">{eyebrow}</p>}
					<h1 className="font-display text-[clamp(3rem,8vw,6.5rem)] leading-[0.92] font-medium tracking-(--lf-display-tracking) text-balance">
						{title}
					</h1>
					<div className="mt-8 max-w-[42ch] text-lg leading-relaxed text-pretty text-ink-muted sm:text-xl">{intro}</div>
					{actions && <div className="mt-10 flex flex-wrap items-center gap-4">{actions}</div>}
				</div>
				{image && <BrandImage src={image.src} alt={image.alt} label={image.label} tint={image.tint} ratio={image.ratio ?? "4/5"} priority sizes="(min-width: 1024px) 40vw, 90vw" />}
			</Container>
		</section>
	);
}
