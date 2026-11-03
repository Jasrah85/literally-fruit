import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

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
	metadataBase: new URL("https://literallyfruit.com"),
	title: "Literally Fruit | Small-batch fruit tea, coming soon",
	description:
		"Loose-leaf tea with real fruit, sweetened with stevia instead of sugar. Blended by hand in small batches in Southwest Ohio.",
	// Placeholder period: keep search engines out until the Phase 0 site launches.
	// Remove this (and robots.ts) at launch.
	robots: { index: false, follow: false },
};

export const viewport: Viewport = {
	themeColor: "#1b1310",
};

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en" className={`${bodoni.variable} ${hanken.variable} h-full`}>
			<body className="min-h-full bg-steep text-leaf">{children}</body>
		</html>
	);
}
