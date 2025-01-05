import { readFileSync } from "fs";
import { dirname, join, parse, resolve } from "path";
import { fileURLToPath } from "url";
import type { GetStaticPropsContext } from "next";
import { globSync } from "glob";
import { bundleMDX } from "mdx-bundler";
import remarkGfm from "remark-gfm";

/** make getStaticProps func for page */
export const mdxStaticProps =
  (url: string) =>
  async ({ params }: GetStaticPropsContext) => {
    /** get url param */
    const { page } = params ?? {};

    /** get mdx source file from pages folder */
    const path = join(getDir(url), `${page}.mdx`);
    const source = readFileSync(path, "utf-8");
    resolve(join(getDir(import.meta.url), "../"));
    const result = await bundleMDX({
      source,
      cwd: root,
      globals: {
        "next/link": "Link",
      },
      mdxOptions: (options) => {
        options.remarkPlugins = [...(options.remarkPlugins ?? []), remarkGfm];
        return options;
      },
      esbuildOptions: (options) => {
        /** https://github.com/kentcdodds/mdx-bundler/issues/116 */
        options.target = "ESNext";
        options.outdir = "./";
        return options;
      },
    });

    return { props: result };
  };

/** make getStaticPaths func for page */
export const mdxStaticPaths = (url: string) => () => {
  const paths = globSync(`*.mdx`, { cwd: getDir(url) }).map(
    (path) => `/${parse(path).name}`,
  );

  return { paths, fallback: false };
};

/** get path's folder name */
const getDir = (url: string) => dirname(fileURLToPath(url));

/** get root folder */
const root = join(getDir(import.meta.url), "..", "..");
