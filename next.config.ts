import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',  // Next.js를 정적 HTML/CSS/JS 파일로 변환 (GitHub Pages용)
  trailingSlash: false,  // trailing slash 비활성화로 라우팅 문제 방지
  // 커스텀 도메인 사용 시 basePath/assetPrefix 불필요
  images: {
    unoptimized: true,  // 정적 export에서 이미지 최적화 비활성화
  },
};

export default nextConfig;
