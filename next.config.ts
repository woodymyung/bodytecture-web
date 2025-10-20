import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // GitHub Pages 정적 배포를 위한 export 활성화
  output: 'export',
  trailingSlash: false,  // trailing slash 비활성화로 라우팅 문제 방지
  images: {
    unoptimized: true,  // 정적 export에서 이미지 최적화 비활성화
    qualities: [75, 85, 90, 95], // 이미지 품질 옵션 설정
  },
};

export default nextConfig;
