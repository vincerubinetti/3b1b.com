import { readFileSync } from "fs";
import { dirname, join, parse } from "path";
import { fileURLToPath } from "url";
import type { GetStaticPropsContext } from "next";
import { serialize } from "next-mdx-remote/serialize";
import { globSync } from "glob";

/** make getStaticProps func for page */
export const mdxStaticProps =
  (url: string) =>
  async ({ params }: GetStaticPropsContext) => {
    /** get url param */
    const { page } = params ?? {};

    /** get mdx source file from pages folder */
    const path = join(getDir(url), `${page}.mdx`);
    const raw = readFileSync(path, "utf-8");
    const source = await serialize(raw, { parseFrontmatter: true });

    return { props: { frontmatter: source.frontmatter, source } };
  };

/** make getStaticPaths func for page */
export const mdxStaticPaths = (url: string) => () => {
  const paths = globSync(`*.mdx`, { cwd: getDir(url) }).map(
    (path) => `/${parse(path).name}`,
  );
  return {
    paths,
    fallback: false,
  };
};

/** get path's folder name */
const getDir = (url: string) => dirname(fileURLToPath(url));
