/*
 * npm run images  (also runs automatically before `dev` and `build`)
 *
 * Turns originals in assets/raw/ into sized AVIF + WebP files in public/img/,
 * and writes src/generated/image-manifest.json for <BrandImage>.
 *
 *   assets/raw/blends/<slug>/<shot>.jpg   → product photos (shot: pouch, leaf, cup, lifestyle)
 *   assets/raw/label-art/<slug>.png       → scanned label art, used until photos exist
 *   assets/raw/site/<name>.jpg            → everything else (hero, about, journal)
 *
 * Accepts .jpg .jpeg .png .webp .tif .tiff. Files are re-encoded only when the
 * original is newer than the output, so repeat runs are fast. Both output
 * folders are gitignored: originals are the source of truth.
 */
import { existsSync, mkdirSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, extname, join, relative, resolve } from "node:path";
import sharp from "sharp";

const ROOT = resolve(import.meta.dirname, "..");
const RAW = join(ROOT, "assets/raw");
const OUT = join(ROOT, "public/img");
const MANIFEST = join(ROOT, "src/generated/image-manifest.json");

const WIDTHS = [480, 960, 1600];
const EXTS = new Set([".jpg", ".jpeg", ".png", ".webp", ".tif", ".tiff"]);

export type ManifestEntry = {
	/** Intrinsic size of the largest output. */
	width: number;
	height: number;
	widths: number[];
	alpha: boolean;
	/** Tiny blurred WebP shown while the real image loads. */
	blurDataURL: string;
};

function walk(dir: string): string[] {
	if (!existsSync(dir)) return [];
	return readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
		const p = join(dir, e.name);
		if (e.isDirectory()) return walk(p);
		return EXTS.has(extname(e.name).toLowerCase()) && !e.name.startsWith(".") ? [p] : [];
	});
}

function keyFor(file: string): string {
	return relative(RAW, file)
		.slice(0, -extname(file).length)
		.split(/[\\/]/)
		.map((part) => part.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""))
		.join("/");
}

function isFresh(out: string, srcMtime: number): boolean {
	return existsSync(out) && statSync(out).mtimeMs >= srcMtime;
}

async function processFile(file: string): Promise<[string, ManifestEntry]> {
	const key = keyFor(file);
	const srcMtime = statSync(file).mtimeMs;
	const meta = await sharp(file).metadata();
	const rotated = (meta.orientation ?? 1) >= 5;
	const srcW = (rotated ? meta.height : meta.width) ?? 0;
	const srcH = (rotated ? meta.width : meta.height) ?? 0;
	if (!srcW || !srcH) throw new Error(`Couldn't read dimensions of ${relative(ROOT, file)}`);

	const largest = Math.min(srcW, WIDTHS[WIDTHS.length - 1]);
	const widths = [...new Set([...WIDTHS.filter((w) => w < largest), largest])];

	for (const w of widths) {
		for (const fmt of ["avif", "webp"] as const) {
			const out = join(OUT, `${key}-${w}.${fmt}`);
			if (isFresh(out, srcMtime)) continue;
			mkdirSync(dirname(out), { recursive: true });
			const img = sharp(file).rotate().resize({ width: w, withoutEnlargement: true });
			await (fmt === "avif" ? img.avif({ quality: 55, effort: 4 }) : img.webp({ quality: 78 })).toFile(out);
		}
	}

	const blur = await sharp(file).rotate().resize({ width: 16 }).webp({ quality: 40 }).toBuffer();
	return [
		key,
		{
			width: largest,
			height: Math.round((largest * srcH) / srcW),
			widths,
			alpha: Boolean(meta.hasAlpha),
			blurDataURL: `data:image/webp;base64,${blur.toString("base64")}`,
		},
	];
}

async function main() {
	const files = walk(RAW);
	const entries: [string, ManifestEntry][] = [];
	const seen = new Map<string, string>();
	for (const file of files) {
		const key = keyFor(file);
		if (seen.has(key)) {
			throw new Error(`Two originals map to "${key}": ${seen.get(key)} and ${relative(ROOT, file)}`);
		}
		seen.set(key, relative(ROOT, file));
		entries.push(await processFile(file));
	}
	entries.sort(([a], [b]) => a.localeCompare(b));
	mkdirSync(dirname(MANIFEST), { recursive: true });
	writeFileSync(MANIFEST, JSON.stringify(Object.fromEntries(entries), null, "\t") + "\n");
	console.log(`✔ images: ${entries.length} original(s) → public/img, manifest updated`);
}

main().catch((err) => {
	console.error(`✖ images: ${(err as Error).message}`);
	process.exit(1);
});
