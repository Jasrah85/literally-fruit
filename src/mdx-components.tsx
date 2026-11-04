import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { Callout, ProductMention } from "@/components/content/MdxBits";

/** Styles for Markdown elements in journal posts, plus components posts can use without importing. */
const components: MDXComponents = {
	h2: (p) => <h2 className="mt-12 font-display text-3xl font-medium text-balance text-ink" {...p} />,
	h3: (p) => <h3 className="mt-8 font-display text-2xl font-medium text-ink" {...p} />,
	p: (p) => <p className="mt-5" {...p} />,
	ul: (p) => <ul className="mt-5 list-disc space-y-2 pl-6 marker:text-ink-muted" {...p} />,
	ol: (p) => <ol className="mt-5 list-decimal space-y-2 pl-6 marker:text-ink-muted" {...p} />,
	strong: (p) => <strong className="font-semibold text-ink" {...p} />,
	a: ({ href = "", ...p }) =>
		href.startsWith("/") ? (
			<Link href={href} className="text-ink underline decoration-ink/40 underline-offset-4 hover:decoration-ink" {...p} />
		) : (
			<a href={href} className="text-ink underline decoration-ink/40 underline-offset-4 hover:decoration-ink" rel="noopener" {...p} />
		),
	Callout,
	ProductMention,
};

export function useMDXComponents(): MDXComponents {
	return components;
}
