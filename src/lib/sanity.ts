import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

// Sanity client 설정
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'yvgbicuy',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'prod', 
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-05-03',
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
  // 모든 트레이너 가져오기
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
    bookingUrl
  }`,
  
  // 특정 트레이너 가져오기 (slug로 조회)
  trainerBySlug: `*[_type == "trainer" && slug.current == $slug][0] {
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
    bookingUrl
  }`,
  
  // 모든 리뷰 가져오기 (최신순)
  reviews: `*[_type == "review" && isPublished == true] | order(createdAt desc) {
    _id,
    author,
    reviewContent,
    rating,
    source,
    createdAt,
    trainer->{
      _id,
      name,
      slug
    }
  }`,
  
  // 특정 트레이너의 모든 리뷰 가져오기
  reviewsByTrainer: `*[_type == "review" && isPublished == true && trainer._ref == $trainerId] | order(createdAt desc) {
    _id,
    author,
    reviewContent,
    rating,
    source,
    createdAt
  }`,
  
  // 모든 운동기구 가져오기
  equipment: `*[_type == "equipment" && isActive == true] | order(name asc) {
    _id,
    name,
    slug,
    cover,
    description,
    usage,
    category,
    targetMuscles,
    difficulty
  }`,
  
  // 특정 카테고리의 운동기구 가져오기
  equipmentByCategory: `*[_type == "equipment" && isActive == true && category == $category] | order(name asc) {
    _id,
    name,
    slug,
    cover,
    description,
    usage,
    category,
    targetMuscles,
    difficulty
  }`,
  
  // 모든 블로그 포스트 가져오기 (발행된 것만, 최신순)
  blogPosts: `*[_type == "blogPost" && isPublished == true] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    coverImage,
    category,
    tags,
    publishedAt,
    author->{
      _id,
      name,
      slug
    }
  }`,
  
  // 특정 블로그 포스트 가져오기 (전체 내용 포함)
  blogPostBySlug: `*[_type == "blogPost" && slug.current == $slug && isPublished == true][0] {
    _id,
    title,
    slug,
    excerpt,
    coverImage,
    content,
    category,
    tags,
    publishedAt,
    author->{
      _id,
      name,
      slug,
      profileImage
    }
  }`,
  
  // 추천 블로그 포스트 가져오기
  featuredBlogPosts: `*[_type == "blogPost" && isPublished == true && featured == true] | order(publishedAt desc) [0...3] {
    _id,
    title,
    slug,
    excerpt,
    coverImage,
    publishedAt,
    author->{
      _id,
      name,
      slug
    }
  }`
}
