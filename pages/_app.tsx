import "../styles/globals.css";
import type { AppProps } from "next/app";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!;
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PayPalScriptProvider
      options={{
        "enable-funding": "venmo",
        "disable-funding": "credit",
        "client-id":
          process.env.NODE_ENV !== "development" ? "test" : CLIENT_ID,
      }}
    >
      <Component {...pageProps} />
    </PayPalScriptProvider>
  );
}

export default MyApp;
