import type { NextConfig } from "next";
import createRemoteRefresh from "next-remote-refresh";

const withRemoteRefresh = createRemoteRefresh({ paths: [""] });

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
};

export default withRemoteRefresh(nextConfig);
