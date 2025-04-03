/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",

  // Fix for "The default export is not a React Component" error
  pageExtensions: ["tsx", "ts", "jsx", "js", "md", "mdx"],

  // Configure webpack for client-side only modules
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        path: false,
      };
    }
    return config;
  },
};

module.exports = nextConfig;
