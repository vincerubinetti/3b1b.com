import type { AppProps } from "next/app";
import Head from "next/head";
import { useEffect } from "react";
import type { UnknownRecord } from "type-fest";
import { fonts } from "@/pages/_document";
import { description, title, url } from "@/vars";
import "@/styles/theme.css";
import "@/styles/global.css";

/** root page layout */
const App = ({
  Component,
  pageProps,
}: AppProps<UnknownRecord & { frontmatter?: UnknownRecord }>) => {
  /** page title + site title */
  const fullTitle = [pageProps.title, pageProps.frontmatter?.title, title]
    .filter(Boolean)
    .join(" | ");

  /** set font css variables on page load */
  useEffect(() => {
    for (const { cssVar, name, fallback } of fonts)
      document.documentElement.style.setProperty(
        `--${cssVar}`,
        `"${name}", ${fallback}`,
      );
  }, []);

  return (
    <>
      <Head>
        <title>{fullTitle}</title>
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />

        <meta name="title" content={fullTitle} />
        <meta name="description" content={description} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={description} />
      </Head>

      <Component {...pageProps} />
    </>
  );
};

export default App;
