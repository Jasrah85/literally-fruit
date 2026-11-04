import type { Product } from "@/lib/catalog";
import { ProductCard } from "./ProductCard";

export function ProductGrid({ products, priorityCount = 0 }: { products: Product[]; priorityCount?: number }) {
	return (
		<ul role="list" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{products.map((p, i) => (
				<li key={p.id} className="flex">
					<div className="flex w-full flex-col [&>article]:flex-1">
						<ProductCard product={p} priority={i < priorityCount} />
					</div>
				</li>
			))}
		</ul>
	);
}
