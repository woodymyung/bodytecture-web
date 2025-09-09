// robots.txt 파일 생성 - 검색엔진 크롤러에게 사이트 탐색 규칙을 알려줍니다
// 크롤링을 허용/차단할 경로와 sitemap 위치를 명시합니다

import { MetadataRoute } from 'next';

// Static export를 위한 설정
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://bodytecture.fit';

  return {
    rules: [
      {
        // 모든 검색엔진 크롤러에 대한 규칙
        userAgent: '*',
        allow: '/', // 모든 페이지 크롤링 허용
        
        // 크롤링하지 않았으면 하는 경로들 (필요시 추가)
        disallow: [
          '/api/', // API 경로는 크롤링 불필요
          '/admin/', // 관리자 페이지가 있다면
          '/*.json$', // JSON 파일들
          '/private/', // 비공개 영역이 있다면
        ],
      },
      {
        // 구글 크롤러에 대한 특별 규칙 (필요시)
        userAgent: 'Googlebot',
        allow: ['/', '/images/'], // 배열로 여러 경로 허용
      },
      {
        // 네이버 크롤러에 대한 특별 규칙 (한국 사이트이므로)
        userAgent: 'Yeti', // 네이버 검색로봇
        allow: ['/', '/images/'], // 배열로 여러 경로 허용
      }
    ],
    
    // Sitemap 위치 명시 - 검색엔진이 사이트 구조를 쉽게 파악할 수 있도록
    sitemap: `${baseUrl}/sitemap.xml`,
    
    // 크롤 지연 설정 (서버 부하 방지) - 선택사항
    // crawlDelay: 1, // 1초 지연 (GitHub Pages에서는 불필요)
  };
}
