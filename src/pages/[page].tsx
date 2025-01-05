import type { InferGetStaticPropsType } from "next";
import { useRemoteRefresh } from "next-remote-refresh/hook";
import Link from "next/link";
import { useMemo } from "react";
import { getMDXComponent } from "mdx-bundler/client";
import { mdxStaticPaths, mdxStaticProps } from "@/util/pages";

/** render mdx pages in this folder */
const Page = ({ code }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const Component = useMemo(
    () => getMDXComponent(code, { Link: Link }),
    [code],
  );

  /** allow dev hot reload to work */
  useRemoteRefresh();

  return <Component />;
};

export default Page;

export const getStaticProps = mdxStaticProps(import.meta.url);
export const getStaticPaths = mdxStaticPaths(import.meta.url);
