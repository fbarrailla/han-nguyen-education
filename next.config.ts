import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isGitHubPages ? "/han-nguyen-education" : "",
  assetPrefix: isGitHubPages ? "/han-nguyen-education/" : "",
  turbopack: {
    root: __dirname,
  },
  experimental: {
    staticGenerationMaxConcurrency: 1,
    staticGenerationMinPagesPerWorker: 1,
  },
};

export default nextConfig;
