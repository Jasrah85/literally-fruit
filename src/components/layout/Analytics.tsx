import Script from "next/script";
import { TAG_ID, USES_GTM } from "@/lib/analytics";

/** Google Tag Manager or GA4, depending on the ID. Renders nothing until NEXT_PUBLIC_GA_ID is set. */
export function Analytics() {
	if (!TAG_ID || !/^(G|GTM)-[A-Z0-9]+$/.test(TAG_ID)) return null;

	if (USES_GTM) {
		return (
			<>
				<Script id="gtm" strategy="afterInteractive">
					{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${TAG_ID}');`}
				</Script>
				<noscript>
					<iframe src={`https://www.googletagmanager.com/ns.html?id=${TAG_ID}`} height="0" width="0" style={{ display: "none", visibility: "hidden" }} title="Google Tag Manager" />
				</noscript>
			</>
		);
	}

	return (
		<>
			<Script src={`https://www.googletagmanager.com/gtag/js?id=${TAG_ID}`} strategy="afterInteractive" />
			<Script id="ga-init" strategy="afterInteractive">
				{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${TAG_ID}');`}
			</Script>
		</>
	);
}
