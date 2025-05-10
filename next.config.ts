import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',   // 静的HTMLとしてエクスポート
  images: {
    unoptimized: true, // 全ての next/image で画像最適化を無効化
  },
};

export default nextConfig;
