import type { NextConfig } from "next";

// module.exports = {
//   output: 'export',
// };

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_SPACE_ID: process.env.NEXT_PUBLIC_SPACE_ID,
    NEXT_PUBLIC_ACCESS_TOKEN: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
  }
};

export default nextConfig;
