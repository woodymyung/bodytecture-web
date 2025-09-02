import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',  // Next.js를 정적 HTML/CSS/JS 파일로 변환 (GitHub Pages용)
  trailingSlash: true,  // GitHub Pages 호환성을 위한 trailing slash
  images: {
    unoptimized: true,  // 정적 export에서 이미지 최적화 비활성화
  },
  // basePath를 제거하고 상대 경로 사용
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : undefined,  // 프로덕션에서 상대 경로 사용
};

export default nextConfig;
