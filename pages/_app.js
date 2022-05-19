import { useEffect } from "react";
import Head from "next/head";
import ym, { YMInitializer } from "react-yandex-metrika";
import { useRouter } from "next/router";

import "../styles/colors.css";
import "../styles/globals.css";
import "../public/css/app.min.css";
import Script from "next/script";
import StoreProvider from "../context/StoreProvider";

const analyticID1 = "UA-73451034-1";
const analyticID2 = "AW-359547484";
const analyticID3 = "G-SWHHCJ1EK6";
const analyticID4 = "GTM-M4BCPX3";

function MyApp({ Component, pageProps }) {
	const router = useRouter();
	const handleRouteChange = (url) => {
		if (typeof window !== "undefined") {
			ym("hit", url);
			window.gtag("config", analyticID1, {
				page_path: url,
			});
			window.gtag("config", analyticID2, {
				page_path: url,
			});
			window.gtag("config", analyticID3, {
				page_path: url,
			});
		}
	};

	useEffect(() => {
		router.events.on("routeChangeComplete", handleRouteChange);
		router.events.on("routeChangeStart", (url) => {
			ym("hit", url);
		});
		return () => {
			router.events.off("routeChangeComplete", handleRouteChange);
			router.events.off("routeChangeStart", (url) => {
				ym("hit", url);
			});
		};
	}, [router.events]);
	return (
		<>
			<Head>
				<title>Sola Store Magazine</title>
				<link
					rel="apple-touch-icon"
					sizes="57x57"
					href="public/favicon/apple-icon-57x57.jpg"
				/>
				<link
					rel="apple-touch-icon"
					sizes="60x60"
					href="public/favicon/apple-icon-60x60.jpg"
				/>
				<link
					rel="apple-touch-icon"
					sizes="72x72"
					href="public/favicon/apple-icon-72x72.jpg"
				/>
				<link
					rel="apple-touch-icon"
					sizes="76x76"
					href="public/favicon/apple-icon-76x76.jpg"
				/>
				<link
					rel="apple-touch-icon"
					sizes="114x114"
					href="public/favicon/apple-icon-114x114.jpg"
				/>
				<link
					rel="apple-touch-icon"
					sizes="120x120"
					href="public/favicon/apple-icon-120x120.jpg"
				/>
				<link
					rel="apple-touch-icon"
					sizes="144x144"
					href="public/favicon/apple-icon-144x144.jpg"
				/>
				<link
					rel="apple-touch-icon"
					sizes="152x152"
					href="public/favicon/apple-icon-152x152.jpg"
				/>
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="public/favicon/apple-icon-180x180.jpg"
				/>
				<link
					rel="icon"
					type="image/jpeg"
					sizes="192x192"
					href="public/favicon/android-icon-192x192.jpg"
				/>
				<link
					rel="icon"
					type="image/jpeg"
					sizes="32x32"
					href="public/favicon/favicon-32x32.jpg"
				/>
				<link
					rel="icon"
					type="image/jpeg"
					sizes="96x96"
					href="public/favicon/favicon-96x96.jpg"
				/>
				<link
					rel="icon"
					type="image/jpeg"
					sizes="16x16"
					href="public/favicon/favicon-16x16.jpg"
				/>
				<link rel="manifest" href="public/favicon/manifest.json" />
				{/* Analytics */}
				<script src="https://www.google-analytics.com/analytics.js" defer />
				<script src="https://www.google-analytics.com/plugins/ua/ec.js" defer />
				<script
					src="https://www.google-analytics.com/plugins/ua/ecommerce.js"
					defer
				/>
				<script
					src="https://www.googleadservices.com/pagead/conversion_async.js"
					defer
				/>
				{/* Init scripts end */}
				<Script
					src={`https://www.googletagmanager.com/gtag/js?id=${analyticID4}`}
					strategy="afterInteractive"
				/>
				<Script
					id="google-tag-manager"
					strategy="afterInteractive">{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${analyticID4}');`}</Script>
			</Head>
			<StoreProvider>
				<Component {...pageProps} />
			</StoreProvider>
			<Script
				src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
				integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
				crossOrigin="anonymous"
			/>
			<Script
				type="module"
				src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"
				strategy="afterInteractive"
			/>
			<Script
				nomodule
				src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"
				strategy="afterInteractive"
			/>
			<YMInitializer
				accounts={[69119899]}
				options={{
					accurateTrackBounce: true,
					webvisor: true,
					defer: true,
					clickmap: true,
					trackHash: true,
					trackLinks: true,
				}}
				version="2"
			/>
			<Script
				src={`https://www.googletagmanager.com/gtag/js?id=${analyticID1}`}
				strategy="afterInteractive"
			/>
			<Script
				src={`https://www.googletagmanager.com/gtag/js?id=${analyticID2}`}
				strategy="afterInteractive"
			/>
			<Script
				src={`https://www.googletagmanager.com/gtag/js?id=${analyticID3}`}
				strategy="afterInteractive"
			/>

			<Script
				id={`google-analytics-${analyticID2}`}
				strategy="afterInteractive">
				{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${analyticID2}'); 
          `}
			</Script>
			<Script
				id={`google-analytics-${analyticID1}`}
				strategy="afterInteractive">
				{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${analyticID1}'); 
          `}
			</Script>
			<Script
				id={`google-analytics-${analyticID3}`}
				strategy="afterInteractive">
				{`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${analyticID3}');`}
			</Script>
			<Script id="facebook-analytics" strategy="afterInteractive">
				{`!function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '137952878122881');
      fbq('track', 'PageView');`}
			</Script>
		</>
	);
}

export default MyApp;
