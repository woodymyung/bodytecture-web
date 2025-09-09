// SEO 최적화를 위한 메타데이터 유틸리티 함수들
// 각 페이지에서 메타데이터를 일관되게 생성할 수 있도록 돕는 헬퍼 함수들

import type { Metadata } from 'next';

// 기본 사이트 정보
const SITE_CONFIG = {
  name: '바디텍쳐 왕십리 청계점',
  description: '왕십리 청계천 근처의 정원제로 운영되는 프리미엄 헬스장. 개인 트레이닝, 그룹 클래스, 최신 운동 시설을 제공합니다.',
  url: 'https://woodymyung.github.io/bodytecture-web',
  ogImage: '/images/bodytecture_cover_optimized.jpg',
  keywords: [
    '바디텍쳐', '왕십리', '청계', '헬스장', '피트니스', 
    '개인트레이닝', 'PT', '그룹클래스', '정원제', 
    '프리미엄 헬스장', '성동구 헬스장'
  ]
};

interface GenerateMetadataProps {
  title: string;
  description?: string;
  path?: string;
  keywords?: string[];
  images?: {
    url: string;
    width?: number;
    height?: number;
    alt?: string;
  }[];
  type?: 'website' | 'article' | 'profile';
}

// 페이지별 메타데이터 생성 함수
export function generatePageMetadata({
  title,
  description = SITE_CONFIG.description,
  path = '',
  keywords = [],
  images,
  type = 'website'
}: GenerateMetadataProps): Metadata {
  // 최종 URL 생성
  const url = `${SITE_CONFIG.url}${path}`;
  
  // 키워드 통합 (기본 키워드 + 페이지별 키워드)
  const allKeywords = [...SITE_CONFIG.keywords, ...keywords];
  
  // 기본 이미지 설정 (전달된 이미지가 없으면 기본 이미지 사용)
  const ogImages = images || [{
    url: SITE_CONFIG.ogImage,
    width: 1200,
    height: 630,
    alt: `${title} - ${SITE_CONFIG.name}`
  }];

  return {
    title,
    description,
    keywords: allKeywords.join(', '),
    
    // Open Graph 설정
    openGraph: {
      title: `${title} | ${SITE_CONFIG.name}`,
      description,
      type,
      locale: 'ko_KR',
      url,
      siteName: SITE_CONFIG.name,
      images: ogImages,
    },
    
    // Twitter Cards 설정
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${SITE_CONFIG.name}`,
      description,
      images: ogImages.map(img => img.url),
    },
    
    // Canonical URL 설정 - 중복 콘텐츠 방지
    alternates: {
      canonical: url,
    },
    
    // 추가 메타 정보
    authors: [{ 
      name: SITE_CONFIG.name, 
      url: SITE_CONFIG.url 
    }],
    
    // 검색엔진 최적화 설정
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

// 트레이너 페이지용 특별 메타데이터 생성
export function generateTrainerMetadata(
  trainer: {
    name: string;
    description: string;
    slug: string;
    images?: { asset: { url: string } }[];
  }
): Metadata {
  // 트레이너 이미지가 있으면 사용, 없으면 기본 이미지
  const trainerImage = trainer.images?.[0]?.asset?.url || SITE_CONFIG.ogImage;
  
  return generatePageMetadata({
    title: `${trainer.name} - 전문 트레이너`,
    description: `${trainer.description} | ${SITE_CONFIG.name}의 전문 트레이너 ${trainer.name}을 소개합니다.`,
    path: `/trainers/${trainer.slug}`,
    keywords: ['전문트레이너', trainer.name, 'PT', '개인트레이닝'],
    images: [{
      url: trainerImage,
      width: 1200,
      height: 630,
      alt: `${trainer.name} - ${SITE_CONFIG.name} 전문 트레이너`
    }],
    type: 'profile'
  });
}

// JSON-LD 구조화된 데이터 생성 (LocalBusiness 스키마)
export function generateLocalBusinessStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_CONFIG.url}#organization`,
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/images/bodytecture-logo.svg`,
    image: `${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`,
    
    // 업종 정보
    '@type': ['LocalBusiness', 'SportsActivityLocation', 'ExerciseGym'],
    
    // 주소 정보
    address: {
      '@type': 'PostalAddress',
      streetAddress: '서울 성동구 청계천로 573',
      addressLocality: '성동구',
      addressRegion: '서울',
      addressCountry: 'KR'
    },
    
    // 지리적 위치
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 37.5665,
      longitude: 127.0321
    },
    
    // 연락처 정보
    telephone: '+82-507-1388-8620', // 바디텍쳐 왕십리 청계점 실제 연락처
    
    // 운영 시간
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '06:00',
        closes: '24:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday', 'Sunday'],
        opens: '06:00',
        closes: '24:00'
      }
    ],
    
    // 제공 서비스
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: '바디텍쳐 서비스',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: '개인 트레이닝 (PT)',
            description: '1:1 맞춤형 개인 트레이닝'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: '그룹 클래스',
            description: '소규모 그룹 운동 클래스'
          }
        }
      ]
    }
  };
}

// 트레이너 개별 페이지용 Person 스키마
export function generatePersonStructuredData(trainer: {
  name: string;
  description: string;
  slug: string;
  images?: { asset: { url: string } }[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_CONFIG.url}/trainers/${trainer.slug}#person`,
    name: trainer.name,
    description: trainer.description,
    url: `${SITE_CONFIG.url}/trainers/${trainer.slug}`,
    image: trainer.images?.[0]?.asset?.url || SITE_CONFIG.ogImage,
    
    // 직업 정보
    jobTitle: '피트니스 트레이너',
    worksFor: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url
    },
    
    // 전문 분야
    knowsAbout: ['피트니스', '개인트레이닝', '운동처방', '건강관리'],
  };
}

export { SITE_CONFIG };
