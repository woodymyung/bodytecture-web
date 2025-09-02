import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'export',  // Next.js를 정적 HTML/CSS/JS 파일로 변환 (GitHub Pages용)
  trailingSlash: false,  // trailing slash 비활성화로 라우팅 문제 방지
  ...(isProd && { 
    basePath: '/bodytecture-web',
    assetPrefix: '/bodytecture-web/'
  }),  // 배포시에만 GitHub Pages 서브디렉토리 경로 설정
  images: {
    unoptimized: true,  // 정적 export에서 이미지 최적화 비활성화
  },
};

export default nextConfig;
