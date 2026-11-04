import type { ReactNode } from "react";
import { BrandImage } from "@/components/ui/BrandImage";
import { cn } from "@/lib/cn";

type Props = {
	title: string;
	children: ReactNode;
	image: { src: string; alt: string; label?: string; tint?: string };
	/** Put the image on the right instead of the left. */
	flip?: boolean;
	action?: ReactNode;
};

export function StoryBlock({ title, children, image, flip, action }: Props) {
	return (
		<div className="grid items-center gap-10 md:grid-cols-2 lg:gap-16">
			<BrandImage {...image} ratio="3/2" sizes="(min-width: 768px) 45vw, 90vw" className={cn(flip && "md:order-2")} />
			<div>
				<h2 className="font-display text-4xl leading-[1.05] font-medium text-balance sm:text-5xl">{title}</h2>
				<div className="mt-5 flex flex-col gap-4 text-lg leading-relaxed text-pretty text-ink-muted">{children}</div>
				{action && <div className="mt-8">{action}</div>}
			</div>
		</div>
	);
}
