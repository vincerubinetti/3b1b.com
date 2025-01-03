import type { InferGetStaticPropsType } from "next";
import { MDXRemote } from "next-mdx-remote";
import { mdxStaticPaths, mdxStaticProps } from "@/util/pages";

/** render mdx pages in this folder */
const Page = ({ source }: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (!source) return <></>;

  return <MDXRemote {...source} />;
};

export default Page;

export const getStaticProps = mdxStaticProps(import.meta.url);
export const getStaticPaths = mdxStaticPaths(import.meta.url);
