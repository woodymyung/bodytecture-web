import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

// Sanity client 설정 - 환경변수 디버깅
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'yvgbicuy';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'prod';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-05-03';

// 개발 환경에서 환경변수 확인
if (process.env.NODE_ENV === 'development') {
  console.log('🔧 Sanity 설정 확인:', {
    projectId,
    dataset,
    apiVersion,
    envVars: {
      NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
      NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
      NEXT_PUBLIC_SANITY_API_VERSION: process.env.NEXT_PUBLIC_SANITY_API_VERSION
    }
  });
}

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // 프로덕션에서 CDN 사용으로 속도 향상
})

// 이미지 URL 빌더 설정
const builder = imageUrlBuilder(client)

// 이미지 URL 생성 함수 - Sanity 이미지 에셋을 URL로 변환
export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// 🎨 고품질 이미지 URL 생성 함수들 - 화질 저하 방지
export function getHighQualityImageUrl(source: SanityImageSource, width: number, height: number, quality: number = 90) {
  return urlFor(source)
    .width(width)
    .height(height)
    .quality(quality) // 90% 고품질 유지
    .format('webp') // WebP로 최적화 (화질 유지 + 용량 절약)
    .fit('crop')
    .url()
}

// 원본 품질 유지 (100% 품질)
export function getOriginalQualityImageUrl(source: SanityImageSource, width?: number, height?: number) {
  let imageBuilder = urlFor(source).quality(100)
  
  if (width) imageBuilder = imageBuilder.width(width)
  if (height) imageBuilder = imageBuilder.height(height)
  
  return imageBuilder.url()
}

// 반응형 이미지 (85% 최적화 품질)
export function getResponsiveImageUrl(source: SanityImageSource, width: number, height?: number) {
  const imageBuilder = urlFor(source)
    .width(width)
    .quality(85) // 85%로 최적화된 품질 (웹 최적화)
    .format('webp') // WebP 포맷으로 최적화
    .fit('crop')
    .auto('format') // 브라우저에 따라 최적 포맷 선택

  if (height) {
    imageBuilder.height(height)
  }

  return imageBuilder.url()
}

// GROQ 쿼리들 - Sanity에서 데이터를 가져오는 쿼리문
export const queries = {
  // 모든 트레이너 가져오기 (전체)
  trainers: `*[_type == "trainer"] | order(name asc) {
    _id,
    name,
    slug,
    profileImages,
    summary,
    careers,
    educationalBackground,
    certificates,
    awards,
    socialMedia,
    bookingUrl,
    center
  }`,
  
  // 센터별 트레이너 가져오기
  trainersByCenter: `*[_type == "trainer" && center == $center] | order(name asc) {
    _id,
    name,
    slug,
    profileImages,
    summary,
    careers,
    educationalBackground,
    certificates,
    awards,
    socialMedia,
    bookingUrl,
    center
  }`,
  
  // 특정 트레이너 가져오기 (slug로 조회) - 센터별
  trainerBySlug: `*[_type == "trainer" && slug.current == $slug && center == $center][0] {
    _id,
    name,
    slug,
    profileImages,
    summary,
    careers,
    educationalBackground,
    certificates,
    awards,
    socialMedia,
    bookingUrl,
    center
  }`,
  
  // 모든 리뷰 가져오기 (최신순, 전체)
  reviews: `*[_type == "review" && isPublished == true] | order(createdAt desc) {
    _id,
    author,
    reviewContent,
    rating,
    source,
    createdAt,
    center,
    trainer->{
      _id,
      name,
      slug,
      center
    }
  }`,
  
  // 센터별 리뷰 가져오기 (최신순)
  reviewsByCenter: `*[_type == "review" && isPublished == true && center == $center] | order(createdAt desc) {
    _id,
    author,
    reviewContent,
    rating,
    source,
    createdAt,
    center,
    trainer->{
      _id,
      name,
      slug,
      center
    }
  }`,
  
  // 특정 트레이너의 모든 리뷰 가져오기 (센터별)
  reviewsByTrainer: `*[_type == "review" && isPublished == true && trainer._ref == $trainerId && center == $center] | order(createdAt desc) {
    _id,
    author,
    reviewContent,
    rating,
    source,
    createdAt,
    center
  }`,
  
  // 모든 운동기구 가져오기 (전체)
  equipment: `*[_type == "equipment" && isActive == true] | order(name asc) {
    _id,
    name,
    slug,
    cover,
    description,
    usage,
    category,
    targetMuscles,
    difficulty,
    center
  }`,
  
  // 센터별 운동기구 가져오기
  equipmentByCenter: `*[_type == "equipment" && isActive == true && center == $center] | order(name asc) {
    _id,
    name,
    slug,
    cover,
    description,
    usage,
    category,
    targetMuscles,
    difficulty,
    center
  }`,
  
  // 특정 카테고리의 운동기구 가져오기 (센터별)
  equipmentByCategory: `*[_type == "equipment" && isActive == true && category == $category && center == $center] | order(name asc) {
    _id,
    name,
    slug,
    cover,
    description,
    usage,
    category,
    targetMuscles,
    difficulty,
    center
  }`,
  
  // 모든 블로그 포스트 가져오기 (발행된 것만, 최신순, 전체)
  blogPosts: `*[_type == "blogPost" && isPublished == true] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    coverImage,
    category,
    tags,
    publishedAt,
    center,
    author->{
      _id,
      name,
      slug,
      center
    }
  }`,
  
  // 센터별 블로그 포스트 가져오기 (발행된 것만, 최신순)
  blogPostsByCenter: `*[_type == "blogPost" && isPublished == true && center == $center] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    coverImage,
    category,
    tags,
    publishedAt,
    center,
    author->{
      _id,
      name,
      slug,
      center
    }
  }`,
  
  // 특정 블로그 포스트 가져오기 (전체 내용 포함, 센터별)
  blogPostBySlug: `*[_type == "blogPost" && slug.current == $slug && isPublished == true && center == $center][0] {
    _id,
    title,
    slug,
    excerpt,
    coverImage,
    content,
    category,
    tags,
    publishedAt,
    center,
    author->{
      _id,
      name,
      slug,
      profileImage,
      center
    }
  }`,
  
  // 추천 블로그 포스트 가져오기 (센터별)
  featuredBlogPosts: `*[_type == "blogPost" && isPublished == true && featured == true && center == $center] | order(publishedAt desc) [0...3] {
    _id,
    title,
    slug,
    excerpt,
    coverImage,
    publishedAt,
    center,
    author->{
      _id,
      name,
      slug,
      center
    }
  }`,

  // === 센터 정보 관련 쿼리들 ===
  
  // 모든 센터 정보 가져오기
  centerInfoAll: `*[_type == "info"] | order(centerId asc) {
    _id,
    centerId,
    name,
    description,
    status,
    contact,
    businessHours,
    branding,
    directions,
    socialMedia,
    services,
    seo
  }`,

  // 특정 센터 정보 가져오기 (centerId로 조회)
  centerInfoByCenterId: `*[_type == "info" && centerId == $centerId][0] {
    _id,
    centerId,
    name,
    description,
    status,
    contact,
    businessHours,
    branding,
    directions,
    socialMedia,
    services,
    seo
  }`,

  // 활성화된 센터들만 가져오기
  activeCenterInfo: `*[_type == "info" && status == "active"] | order(centerId asc) {
    _id,
    centerId,
    name,
    description,
    status,
    contact,
    businessHours,
    branding,
    directions,
    socialMedia,
    services,
    seo
  }`,

  // === Key Features 관련 쿼리들 ===
  
  // 모든 센터의 핵심 특징 가져오기 (전체)
  keyFeatures: `*[_type == "keyFeatures" && isActive == true] | order(center asc, order asc) {
    _id,
    center,
    icon,
    title,
    description,
    order,
    isActive
  }`,
  
  // 센터별 핵심 특징 가져오기
  keyFeaturesByCenter: `*[_type == "keyFeatures" && isActive == true && center == $center] | order(order asc) {
    _id,
    center,
    icon,
    title,
    description,
    order,
    isActive
  }`,

  // === 시설 정보 관련 쿼리들 ===
  
  // 모든 시설 정보 가져오기 (활성화된 것만, 전체)
  facilities: `*[_type == "facility" && isActive == true] | order(center asc, order asc) {
    _id,
    title,
    cover,
    description,
    additionalImages,
    order,
    isActive,
    center
  }`,
  
  // 센터별 시설 정보 가져오기 (활성화된 것만)
  facilitiesByCenter: `*[_type == "facility" && isActive == true && center == $center] | order(order asc) {
    _id,
    title,
    cover,
    description,
    additionalImages,
    order,
    isActive,
    center
  }`,
  
  
  
  // 센터별 시설 총 개수 통계
  facilityStats: `{
    "total": count(*[_type == "facility" && isActive == true && center == $center])
  }`
}
