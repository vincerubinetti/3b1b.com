import { Head, Html, Main, NextScript } from "next/document";

/** global static document template */
const Document = () => (
  <Html lang="en">
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1.0" />
      <link rel="icon" type="image/png" sizes="512x512" href="/icon.png" />
      <meta property="og:image" content="share.jpg" />
    </Head>

    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
