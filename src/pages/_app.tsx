import "../styles/globals.css";
import Head from "next/dist/shared/lib/head";
import { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Component {...pageProps}>
      <Head>
        <title>C.bi Projects</title>
        <link rel="icon" href="/portfolio/cbi2.png" />
      </Head>
    </Component>
  );
}

export default MyApp;
