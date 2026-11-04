/*
 * npm run schema
 *
 * Writes data/products.schema.json from the zod schema. products.json points at
 * it with "$schema", so VS Code autocompletes field names and flags typos while
 * you edit. Re-run after changing src/lib/catalog/schema.ts.
 */
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { z } from "zod";
import { CatalogFile } from "../src/lib/catalog/schema";

const schema = z.toJSONSchema(CatalogFile, { io: "input", unrepresentable: "any" });
const out = resolve(import.meta.dirname, "../data/products.schema.json");
writeFileSync(out, JSON.stringify({ title: "Literally Fruit product catalog", ...schema }, null, "\t") + "\n");
console.log("✔ wrote data/products.schema.json");
