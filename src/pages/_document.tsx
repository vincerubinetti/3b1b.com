import { Head, Html, Main, NextScript } from "next/document";

/** google font definitions */
export const fonts = [
  {
    cssVar: "sans",
    fallback: "sans-serif",
    name: "Lexend",
    vars: ":wght@300..700",
  },
  {
    cssVar: "serif",
    fallback: "serif",
    name: "Besley",
    vars: ":wght@400..700",
  },
  {
    cssVar: "mono",
    fallback: "monospace",
    name: "Noto Sans Mono",
    vars: ":wght@400..700",
  },
];

/** construct google font url */
export const fontUrl = new URLSearchParams();
fontUrl.set("display", "swap");
for (const { name, vars } of fonts) fontUrl.append("family", name + vars);

/** global static document template */
const Document = () => {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />

        <link rel="icon" type="image/png" sizes="512x512" href="/icon.png" />
        <meta property="og:image" content="share.jpg" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href={`https://fonts.googleapis.com/css2?${fontUrl}`}
          rel="stylesheet"
        />
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
