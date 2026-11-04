import { SITE } from "@/lib/site";

export function AnnouncementBar() {
	return (
		<div className="bg-label px-4 py-2 text-center text-[0.8125rem] font-medium text-label-ink">
			{SITE.announcement}
		</div>
	);
}
