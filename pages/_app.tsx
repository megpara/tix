import "../styles/globals.css";
import type { AppProps } from "next/app";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Head from "next/head";
import { event } from "./config";

const CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!;
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>BACKWASH</title>
        <meta name="description" content={`${event.title}`} />
        <meta property="og:title" content="MILK" key="ogtitle" />
        <meta
          property="og:description"
          content={`${event.title}`}
          key="ogdesc"
        />
        <meta property="og:image" content="/meta_img.png" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <PayPalScriptProvider
        options={{
          "enable-funding": "venmo",
          "disable-funding": "credit",
          "client-id":
            process.env.NODE_ENV === "development" ? "test" : CLIENT_ID,
        }}
      >
        <Component {...pageProps} />
      </PayPalScriptProvider>
    </>
  );
}

export default MyApp;
