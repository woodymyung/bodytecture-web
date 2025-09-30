// SEO 최적화를 위한 메타데이터 유틸리티 함수들
// 다중 센터 지원을 위한 센터별 메타데이터 생성 헬퍼 함수들

import type { Metadata } from 'next';
import { urlFor } from './sanity';
import type { TrainerImage } from '@/types';
import { getCenterById, type CenterId, type CenterInfo } from '@/constants/centers';

// 공통 사이트 정보 (센터 독립적)
const SITE_CONFIG = {
  url: 'https://bodytecture.fit',
  ogImage: '/images/opengraphimage.png',
  commonKeywords: [
    '헬스장', '피트니스', '개인트레이닝', 'PT', '그룹클래스', 
    '정원제', '프리미엄 헬스장'
  ]
};

// 센터별 사이트 설정 생성 함수
function getCenterSiteConfig(centerId: CenterId) {
  const centerInfo = getCenterById(centerId);
  
  return {
    name: centerInfo.name,
    description: centerInfo.description,
    url: `${SITE_CONFIG.url}/${centerId}`,
    ogImage: SITE_CONFIG.ogImage,
    keywords: [...SITE_CONFIG.commonKeywords, ...centerInfo.keywords]
  };
}

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

// 센터별 메타데이터 생성 props
interface GenerateCenterMetadataProps extends GenerateMetadataProps {
  centerId: CenterId;
}

// 기본 페이지별 메타데이터 생성 함수 (센터 독립적)
export function generatePageMetadata({
  title,
  description = '바디텍쳐와 최원준GYM의 전문 피트니스 센터에서 건강한 라이프스타일을 시작하세요.',
  path = '',
  keywords = [],
  images,
  type = 'website'
}: GenerateMetadataProps): Metadata {
  // 최종 URL 생성
  const url = `${SITE_CONFIG.url}${path}`;
  
  // 키워드 통합 (공통 키워드 + 페이지별 키워드)
  const allKeywords = [...SITE_CONFIG.commonKeywords, ...keywords];
  
  // 기본 이미지 설정 (전달된 이미지가 없으면 기본 이미지 사용)
  const ogImages = images || [{
    url: SITE_CONFIG.ogImage,
    width: 1200,
    height: 630,
    alt: title
  }];

  return {
    title,
    description,
    keywords: allKeywords.join(', '),
    
    // Open Graph 설정
    openGraph: {
      title,
      description,
      type,
      locale: 'ko_KR',
      url,
      siteName: '바디텍쳐 & 최원준GYM',
      images: ogImages,
    },
    
    // Twitter Cards 설정
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImages.map(img => img.url),
    },
    
    // Canonical URL 설정 - 중복 콘텐츠 방지
    alternates: {
      canonical: url,
    },
    
    // 추가 메타 정보
    authors: [{ 
      name: '바디텍쳐 & 최원준GYM', 
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

// 센터별 페이지 메타데이터 생성 함수
export function generateCenterMetadata({
  centerId,
  title,
  description,
  path = '',
  keywords = [],
  images,
  type = 'website'
}: GenerateCenterMetadataProps): Metadata {
  // 센터별 사이트 설정
  const centerSiteConfig = getCenterSiteConfig(centerId);
  
  // 최종 URL 생성
  const url = `${SITE_CONFIG.url}${path}`;
  
  // 키워드 통합 (센터별 키워드 포함)
  const allKeywords = [...centerSiteConfig.keywords, ...keywords];
  
  // 기본 이미지 설정
  const ogImages = images || [{
    url: SITE_CONFIG.ogImage,
    width: 1200,
    height: 630,
    alt: `${title} - ${centerSiteConfig.name}`
  }];

  return {
    title,
    description: description || centerSiteConfig.description,
    keywords: allKeywords.join(', '),
    
    // Open Graph 설정
    openGraph: {
      title: `${title} | ${centerSiteConfig.name}`,
      description: description || centerSiteConfig.description,
      type,
      locale: 'ko_KR',
      url,
      siteName: centerSiteConfig.name,
      images: ogImages,
    },
    
    // Twitter Cards 설정
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${centerSiteConfig.name}`,
      description: description || centerSiteConfig.description,
      images: ogImages.map(img => img.url),
    },
    
    // Canonical URL 설정
    alternates: {
      canonical: url,
    },
    
    // 추가 메타 정보
    authors: [{ 
      name: centerSiteConfig.name, 
      url: centerSiteConfig.url 
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

// 센터별 트레이너 페이지용 특별 메타데이터 생성 - Sanity 이미지 reference를 URL로 변환
export function generateTrainerMetadata(
  trainer: {
    name: string;
    description: string;
    slug: string;
    images?: TrainerImage[];
  },
  centerId?: CenterId // 센터 ID가 없으면 기본 메타데이터 생성 (하위 호환성)
): Metadata {
  // 트레이너 이미지가 있으면 Sanity URL로 변환하여 사용, 없으면 기본 이미지
  let trainerImage = SITE_CONFIG.ogImage;
  
  if (trainer.images && trainer.images.length > 0 && trainer.images[0].asset) {
    try {
      // Sanity 이미지를 오픈그래프용 고품질 URL로 변환 (1200x630px)
      trainerImage = urlFor(trainer.images[0])
        .width(1200)
        .height(630)
        .quality(90)
        .format('webp')
        .fit('crop')
        .url();
    } catch (error) {
      console.warn('트레이너 이미지 URL 생성 실패:', error);
      // 실패하면 기본 이미지 사용
    }
  }
  
  // 센터별 또는 기본 메타데이터 생성
  if (centerId) {
    const centerInfo = getCenterById(centerId);
    return generateCenterMetadata({
      centerId,
      title: `${trainer.name} - 전문 트레이너`,
      description: `${trainer.description} | ${centerInfo.name}의 전문 트레이너 ${trainer.name}을 소개합니다.`,
      path: `/${centerId}/trainers/${trainer.slug}`,
      keywords: ['전문트레이너', trainer.name, 'PT', '개인트레이닝'],
      images: [{
        url: trainerImage,
        width: 1200,
        height: 630,
        alt: `${trainer.name} - ${centerInfo.name} 전문 트레이너`
      }],
      type: 'profile'
    });
  } else {
    // 하위 호환성을 위한 기본 메타데이터 (센터 정보 없이)
    return generatePageMetadata({
      title: `${trainer.name} - 전문 트레이너`,
      description: `${trainer.description} | 전문 트레이너 ${trainer.name}을 소개합니다.`,
      path: `/trainers/${trainer.slug}`,
      keywords: ['전문트레이너', trainer.name, 'PT', '개인트레이닝'],
      images: [{
        url: trainerImage,
        width: 1200,
        height: 630,
        alt: `${trainer.name} - 전문 트레이너`
      }],
      type: 'profile'
    });
  }
}

// 센터별 JSON-LD 구조화된 데이터 생성 (LocalBusiness 스키마)
export function generateLocalBusinessStructuredData(centerId: CenterId) {
  const centerInfo = getCenterById(centerId);
  const centerSiteConfig = getCenterSiteConfig(centerId);
  
  // 센터별 운영시간을 Schema.org 형식으로 변환
  const getOpeningHours = (centerInfo: CenterInfo) => {
    if (centerInfo.status === 'preparing') {
      return []; // 준비중인 센터는 운영시간 없음
    }
    
    return [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: centerInfo.businessHours.weekdays.open.replace('오전 ', '').replace('시', ':00'),
        closes: centerInfo.businessHours.weekdays.close.replace('오후 ', '').replace('시', ':00').replace('11:00', '23:00')
      },
      {
        '@type': 'OpeningHoursSpecification', 
        dayOfWeek: ['Saturday', 'Sunday'],
        opens: centerInfo.businessHours.weekends.open.replace('오전 ', '').replace('시', ':00'),
        closes: centerInfo.businessHours.weekends.close.replace('오후 ', '').replace('시', ':00').replace('5:00', '17:00').replace('6:00', '18:00')
      }
    ];
  };

  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'SportsActivityLocation', 'ExerciseGym'],
    '@id': `${centerSiteConfig.url}#organization`,
    name: centerInfo.name,
    description: centerInfo.description,
    url: centerSiteConfig.url,
    logo: `${SITE_CONFIG.url}/images/bodytecture-logo.svg`,
    image: `${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`,
    
    // 센터별 주소 정보
    address: {
      '@type': 'PostalAddress',
      streetAddress: centerInfo.contact.address,
      addressLocality: centerId === 'wangsimni' ? '성동구' : '강남구',
      addressRegion: '서울',
      addressCountry: 'KR'
    },
    
    // 지리적 위치 (임시 좌표 - 추후 센터별 실제 좌표로 업데이트 필요)
    geo: {
      '@type': 'GeoCoordinates',
      latitude: centerId === 'wangsimni' ? 37.5665 : centerId === 'daechi' ? 37.4979 : 37.5172,
      longitude: centerId === 'wangsimni' ? 127.0321 : centerId === 'daechi' ? 127.0276 : 127.0473
    },
    
    // 센터별 연락처 정보
    telephone: `+82-${centerInfo.contact.phone.replace(/-/g, '-')}`,
    
    // 센터별 운영 시간
    openingHoursSpecification: getOpeningHours(centerInfo),
    
    // 제공 서비스 (공통)
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${centerInfo.shortName} 서비스`,
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

// 센터별 트레이너 개별 페이지용 Person 스키마 - Sanity 이미지 처리
export function generatePersonStructuredData(
  trainer: {
    name: string;
    description: string;
    slug: string;
    images?: TrainerImage[];
  },
  centerId: CenterId
) {
  const centerInfo = getCenterById(centerId);
  const centerSiteConfig = getCenterSiteConfig(centerId);
  
  // 트레이너 이미지 URL 생성 (구조화된 데이터용)
  let personImage = `${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`;
  
  if (trainer.images && trainer.images.length > 0 && trainer.images[0].asset) {
    try {
      // Sanity 이미지를 구조화된 데이터용 URL로 변환
      personImage = urlFor(trainer.images[0])
        .width(400)
        .height(400)
        .quality(85)
        .format('webp')
        .fit('crop')
        .url();
    } catch (error) {
      console.warn('Person 스키마용 이미지 URL 생성 실패:', error);
    }
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${centerSiteConfig.url}/trainers/${trainer.slug}#person`,
    name: trainer.name,
    description: trainer.description,
    url: `${centerSiteConfig.url}/trainers/${trainer.slug}`,
    image: personImage,
    
    // 직업 정보
    jobTitle: '피트니스 트레이너',
    worksFor: {
      '@type': 'Organization',
      name: centerInfo.name,
      url: centerSiteConfig.url
    },
    
    // 전문 분야
    knowsAbout: ['피트니스', '개인트레이닝', '운동처방', '건강관리'],
  };
}

export { SITE_CONFIG };
