import "../styles/globals.css";
import type { AppProps } from "next/app";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Head from "next/head";

const CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!;
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
        <title>BACKWASH</title>
        <meta name="description" content="VOLTA X Peter Kalisch" />
        <meta name="image" content="/backwashb&w.png" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <PayPalScriptProvider
        options={{
          "enable-funding": "venmo",
          "disable-funding": "credit",
          "client-id": "test",
        }}
      >
        <Component {...pageProps} />
      </PayPalScriptProvider>
    </div>
  );
}

export default MyApp;
