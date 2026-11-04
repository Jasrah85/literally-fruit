import type { Line } from "./schema";

export type LineInfo = {
	id: Line;
	name: string;
	/** Short descriptor for badges and cards. */
	kicker: string;
	blurb: string;
	path: string;
};

export const LINES: Record<Line, LineInfo> = {
	fruit: {
		id: "fruit",
		name: "Fruit Teas",
		kicker: "Literally Fruit",
		blurb: "Bright blends on black, green, white, and herbal bases, made with pieces of real fruit and sweetened with stevia instead of sugar.",
		path: "/shop/fruit-teas",
	},
	artisan: {
		id: "artisan",
		name: "Artisan Infusions",
		kicker: "An apothecary line from Literally Fruit",
		blurb: "Numbered herbal blends, softened with fruit and made for the slow parts of the day.",
		path: "/shop/artisan-infusions",
	},
};
