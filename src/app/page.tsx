export default function ComingSoon() {
	return (
		<div className="relative isolate flex min-h-dvh flex-col overflow-hidden">
			<div className="infusion -z-10" aria-hidden="true" />

			<main className="flex flex-1 flex-col px-6 pt-[14vh] pb-10 sm:px-12 lg:px-20">
				<h1 className="font-display text-[clamp(4.25rem,21vw,12.5rem)] leading-[0.86] font-medium tracking-[-0.02em]">
					<span className="block">Literally</span>
					<span className="block pl-[0.6em]">Fruit</span>
				</h1>

				<p className="mt-10 max-w-[34ch] text-[1.1875rem] leading-[1.55] text-leaf sm:mt-12 sm:text-xl">
					Loose-leaf tea with real fruit, sweetened with stevia instead of
					sugar. Blended by hand in small batches in Southwest Ohio.
				</p>

				<section
					aria-label="Our two tea lines"
					className="mt-14 grid max-w-3xl gap-8 border-t border-rule pt-8 sm:grid-cols-2 sm:gap-12"
				>
					<div>
						<h2 className="font-display text-2xl font-medium">Fruit Teas</h2>
						<p className="mt-2 max-w-[36ch] text-pretty leading-[1.6] text-dust">
							Bright blends on black, green, and rooibos bases, made with
							pieces of real fruit.
						</p>
					</div>
					<div>
						<h2 className="font-display text-2xl font-medium">
							Artisan Infusions
						</h2>
						<p className="mt-2 max-w-[36ch] text-pretty leading-[1.6] text-dust">
							Apothecary-style herbal blends, softened with fruit, for slow
							evenings.
						</p>
					</div>
				</section>
			</main>

			<footer className="flex flex-col gap-2 px-6 pb-8 text-sm text-dust sm:flex-row sm:items-end sm:justify-between sm:px-12 lg:px-20">
				<p className="text-base text-pretty text-leaf">
					Our first blends are steeping. The shop opens soon.
				</p>
				<p>© 2026 Literally Fruit</p>
			</footer>
		</div>
	);
}
