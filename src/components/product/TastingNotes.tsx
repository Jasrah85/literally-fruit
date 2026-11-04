export function TastingNotes({ notes }: { notes: string[] }) {
	return (
		<ul role="list" aria-label="Tasting notes" className="flex flex-wrap gap-2">
			{notes.map((n) => (
				<li key={n} className="rounded-full border border-line-rule px-3.5 py-1.5 text-sm">
					{n}
				</li>
			))}
		</ul>
	);
}
