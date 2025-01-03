import "@/styles/theme.css";
import "@/styles/global.css";
import type { AppProps } from "next/app";
import { Besley, Lexend, Noto_Sans_Mono } from "next/font/google";
import Head from "next/head";
import type { UnknownRecord } from "type-fest";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import * as vars from "@/vars";

/** fonts */
const sans = Lexend({
  subsets: ["latin"],
  fallback: ["sans-serif"],
});
const serif = Besley({
  subsets: ["latin"],
  fallback: ["serif"],
});
const mono = Noto_Sans_Mono({
  subsets: ["latin"],
  fallback: ["monospace"],
});
const fonts = { sans, serif, mono };

/** root page layout */
const App = ({
  Component,
  pageProps,
}: AppProps<UnknownRecord & { frontmatter?: UnknownRecord }>) => {
  /** page title and site title */
  const title = [pageProps.title, pageProps.frontmatter?.title, vars.title]
    .filter(Boolean)
    .join(" | ");

  /** page description or site description */
  const description =
    pageProps.description ??
    pageProps.frontmatter?.description ??
    vars.description;

  /** font css variables https://github.com/vercel/next.js/issues/44840 */
  const fontVars = Object.entries(fonts)
    .map(([variable, font]) => `--${variable}: ${font.style.fontFamily};`)
    .join("\n");

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />

        <meta name="title" content={title} />
        <meta name="description" content={description} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={vars.url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Head>

      <style jsx global>
        {`
          :root {
            ${fontVars}
          }
        `}
      </style>

      <Header />
      <main>
        <Component {...pageProps} />
      </main>
      <Footer />
    </>
  );
};

export default App;
