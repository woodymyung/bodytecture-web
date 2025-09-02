import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',  // Next.js를 정적 HTML/CSS/JS 파일로 변환 (GitHub Pages용)
  trailingSlash: true,  // GitHub Pages 호환성을 위한 trailing slash
  basePath: '/bodytecture-web',  // GitHub Pages 서브디렉토리 경로 설정
  assetPrefix: '/bodytecture-web',  // 정적 자산 경로 프리픽스 설정
  images: {
    unoptimized: true,  // 정적 export에서 이미지 최적화 비활성화
  },
};

export default nextConfig;
