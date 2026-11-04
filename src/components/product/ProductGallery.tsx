import type { Product } from "@/lib/catalog";
import { BrandImage } from "@/components/ui/BrandImage";

/** First shot large, the rest as a row beneath. Swipe and zoom come later. */
export function ProductGallery({ product }: { product: Product }) {
	const [first, ...rest] = product.gallery;
	return (
		<div className="flex flex-col gap-3">
			<BrandImage product={product} shot={first} priority sizes="(min-width: 1024px) 45vw, 92vw" />
			{rest.length > 0 && (
				<div className="grid grid-cols-3 gap-3">
					{rest.map((shot) => (
						<BrandImage key={shot} product={product} shot={shot} ratio="1/1" sizes="(min-width: 1024px) 15vw, 30vw" />
					))}
				</div>
			)}
		</div>
	);
}
