import type { AppProps } from "next/app";
import "./global.css";
import Head from "next/head";

/** site variables */
const {
  NEXT_PUBLIC_TITLE: TITLE,
  NEXT_PUBLIC_DESCRIPTION: DESCRIPTION,
  NEXT_PUBLIC_URL: URL,
} = process.env;

/** root page layout */
const App = ({ Component, pageProps }: AppProps) => {
  /** page title + site title */
  const fullTitle = [pageProps.title, TITLE].filter(Boolean).join(" | ");

  return (
    <>
      <Head>
        <title>{fullTitle}</title>

        <meta name="title" content={fullTitle} />
        <meta name="description" content={DESCRIPTION} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={URL} />
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={DESCRIPTION} />
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default App;
