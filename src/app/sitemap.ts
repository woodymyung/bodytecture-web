// 동적 sitemap.xml 생성 - 검색엔진이 사이트 구조를 이해할 수 있도록 도움
// Google Search Console에서 사이트맵 등록 시 사용됩니다

import { MetadataRoute } from 'next';
import { getTrainers } from '@/lib/sanityData';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 기본 사이트 URL
  const baseUrl = 'https://woodymyung.github.io/bodytecture-web';

  // 정적 페이지들 - 우선순위와 변경 빈도 설정
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly', // 메인 페이지는 자주 업데이트
      priority: 1.0, // 가장 중요한 페이지
    },
    {
      url: `${baseUrl}/trainers`,
      lastModified: new Date(),
      changeFrequency: 'monthly', // 트레이너 목록은 월 단위로 변경
      priority: 0.8, // 중요한 페이지
    },
    {
      url: `${baseUrl}/reviews`,
      lastModified: new Date(),
      changeFrequency: 'weekly', // 리뷰는 주 단위로 추가될 수 있음
      priority: 0.7,
    },
    {
      url: `${baseUrl}/facilities`,
      lastModified: new Date(),
      changeFrequency: 'monthly', // 시설 정보는 가끔 변경
      priority: 0.6,
    },
  ];

  try {
    // 동적 페이지들 - 트레이너 개별 페이지
    const trainers = await getTrainers();
    const trainerPages: MetadataRoute.Sitemap = trainers.map((trainer) => ({
      url: `${baseUrl}/trainers/${trainer.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly', // 트레이너 정보는 가끔 업데이트
      priority: 0.5,
    }));

    // 모든 페이지를 합쳐서 반환
    return [...staticPages, ...trainerPages];
    
  } catch (error) {
    console.error('Sitemap 생성 중 오류:', error);
    // 오류가 발생하면 정적 페이지만 반환
    return staticPages;
  }
}
