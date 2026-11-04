import Script from "next/script";
import { GA_ID } from "@/lib/analytics";

/** Google Analytics 4. Renders nothing until NEXT_PUBLIC_GA_ID is set. */
export function Analytics() {
	if (!GA_ID) return null;
	return (
		<>
			<Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
			<Script id="ga-init" strategy="afterInteractive">
				{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA_ID}');`}
			</Script>
		</>
	);
}
