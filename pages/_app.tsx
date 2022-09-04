import "../styles/globals.css";
import type { AppProps } from "next/app";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Head from "next/head";
import { event } from "../lib/config";

const CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!;
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content={`${event.description}`} />
        <meta property="og:title" content={`${event.title}`} key="ogtitle" />
        <meta
          property="og:description"
          content={`${event.description}`}
          key="ogdesc"
        />
        <meta property="og:image" content="/olfaction.jpeg" />
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
