import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Analytics } from "@/components/layout/Analytics";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { LAUNCHED, SITE } from "@/lib/site";

// Self-hosted variable fonts (SIL Open Font License; licenses in ./fonts).
const bodoni = localFont({
	src: "./fonts/BodoniModa-opsz-wght.woff2",
	weight: "400 900",
	style: "normal",
	variable: "--font-bodoni",
	display: "swap",
});

const hanken = localFont({
	src: "./fonts/HankenGrotesk-wght.woff2",
	weight: "100 900",
	style: "normal",
	variable: "--font-hanken",
	display: "swap",
});

export const metadata: Metadata = {
	metadataBase: new URL(SITE.url),
	title: { default: `${SITE.name} | Small-batch fruit tea from Southwest Ohio`, template: `%s | ${SITE.name}` },
	description: SITE.description,
	openGraph: { siteName: SITE.name, type: "website", locale: "en_US" },
	// Until launch, keep search engines out. Flip LAUNCHED in src/lib/site.ts.
	robots: LAUNCHED ? { index: true, follow: true } : { index: false, follow: false },
};

export const viewport: Viewport = {
	themeColor: "#131110",
};

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en" className={`${bodoni.variable} ${hanken.variable} h-full`}>
			<body className="flex min-h-full flex-col bg-surface text-ink">
				<a
					href="#main"
					className="sr-only z-50 rounded-md bg-label px-4 py-2 text-label-ink focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
				>
					Skip to content
				</a>
				<AnnouncementBar />
				<SiteHeader />
				<main id="main" className="flex-1">
					{children}
				</main>
				<SiteFooter />
				<Analytics />
			</body>
		</html>
	);
}
