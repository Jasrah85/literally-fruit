import manifest from "@/generated/image-manifest.json";

export type ImageEntry = {
	width: number;
	height: number;
	widths: number[];
	alpha: boolean;
	blurDataURL: string;
};

const MANIFEST = manifest as Record<string, ImageEntry>;

export function getImage(key: string): ImageEntry | undefined {
	return MANIFEST[key];
}

export function srcSet(key: string, entry: ImageEntry, format: "avif" | "webp"): string {
	return entry.widths.map((w) => `/img/${key}-${w}.${format} ${w}w`).join(", ");
}

export function largestSrc(key: string, entry: ImageEntry): string {
	return `/img/${key}-${entry.widths[entry.widths.length - 1]}.webp`;
}
