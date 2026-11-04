/*
 * npm run validate
 *
 * Checks data/products.json against the zod schema (errors fail CI and the
 * build), then runs softer copy checks that only warn.
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { CatalogFile, type Product } from "../src/lib/catalog/schema";

const file = resolve(import.meta.dirname, "../data/products.json");

let json: unknown;
try {
	json = JSON.parse(readFileSync(file, "utf8"));
} catch (err) {
	console.error(`✖ data/products.json is not valid JSON:\n  ${(err as Error).message}`);
	process.exit(1);
}

const result = CatalogFile.safeParse(json);
if (!result.success) {
	const raw = json as { products?: { id?: string }[] };
	console.error(`✖ data/products.json has ${result.error.issues.length} error(s):\n`);
	for (const issue of result.error.issues) {
		const [, index] = issue.path;
		const who = typeof index === "number" ? raw.products?.[index]?.id ?? `products[${index}]` : "file";
		console.error(`  ${who} → ${issue.path.slice(2).join(".") || "(product)"}: ${issue.message}`);
	}
	process.exit(1);
}

const warnings: string[] = [];
const words = (s: string) => s.trim().split(/\s+/).filter(Boolean).length;

for (const p of result.data.products as Product[]) {
	const w = words(p.description);
	if (w < 50 || w > 130) warnings.push(`${p.id}: description is ${w} words (aim for 60–120)`);
	if (p.copyStatus === "draft" && p.status === "available") warnings.push(`${p.id}: available but copy is still marked draft`);
	if (p.status === "available" && p.cautions.length === 0 && p.line === "artisan")
		warnings.push(`${p.id}: double-check that no label caution is needed`);
}

const products = result.data.products;
const drafts = products.filter((p) => p.copyStatus === "draft").length;
const internal = products.filter((p) => !p.cottageEligible).map((p) => p.id);

console.log(`✔ ${products.length} products valid`);
if (drafts) console.log(`  ${drafts} still have draft copy`);
if (internal.length) console.log(`  Hidden until ODA confirms cottage status: ${internal.join(", ")}`);
for (const w of warnings) console.warn(`  ⚠ ${w}`);
