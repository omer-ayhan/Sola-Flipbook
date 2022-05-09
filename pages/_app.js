import Head from "next/head";

import "../styles/colors.css";
import "../styles/globals.css";
import "../public/css/app.min.css";
import Script from "next/script";
import StoreProvider from "../context/StoreProvider";

function MyApp({ Component, pageProps }) {
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
		</>
	);
}

export default MyApp;
