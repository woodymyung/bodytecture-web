import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ISR(Incremental Static Regeneration) 활성화 - Sanity 데이터 변경 시 자동 반영
  // output: 'export' 제거하여 동적 렌더링 지원
  trailingSlash: false,  // trailing slash 비활성화로 라우팅 문제 방지
  images: {
    unoptimized: true,  // 정적 export에서 이미지 최적화 비활성화
    qualities: [75, 85, 90, 95], // 이미지 품질 옵션 설정
  },
};

export default nextConfig;
