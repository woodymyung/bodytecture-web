import { client, queries, urlFor } from './sanity'
import type { 
  Trainer, 
  Review, 
  BlogPost, 
  Facility,
  CenterInfo,
  SanityTrainerRaw,
  SanityReviewRaw,
  SanityBlogPostRaw,
  SanityEquipmentRaw,
  SanityCenterInfoRaw
} from '@/types'

// 제대로 된 SEOSettings 타입 정의 
interface SEOPageData {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  ogImage?: {
    asset: {
      _ref: string;
      _type: 'reference';
    };
    alt?: string;
  };
}

interface SEORootPage extends SEOPageData {
  ogImage?: {
    asset: {
      _ref: string;
      _type: 'reference';
    };
    alt?: string;
  };
}

interface SEOCenterPages {
  centerId: string;
  mainPage?: SEOPageData;
  trainersPage?: SEOPageData;
  reviewsPage?: SEOPageData;
  postsPage?: SEOPageData;
  facilitiesPage?: SEOPageData;
}

interface SEOTrainer extends SEOPageData {
  slug: string;
  centerId: string;
  // 참고: specialties, OG 이미지는 모두 Trainer 문서에서 자동 가져옴
}

interface SEOSettings {
  _id: string;
  _type: 'seoSettings';
  rootPage: SEORootPage;
  centers: SEOCenterPages[];
  trainers: SEOTrainer[];
}

// 트레이너 데이터 가져오기 함수들
// 모든 센터의 트레이너 가져오기 (전체용)
export async function getTrainers(): Promise<Trainer[]> {
  try {
    const trainers = await client.fetch(queries.trainers)
    // trainers가 배열이 아니거나 null/undefined인 경우 대비
    if (!Array.isArray(trainers)) {
      console.warn('트레이너 데이터가 배열이 아닙니다:', trainers)
      return []
    }
    return trainers.map(transformTrainer)
  } catch (error) {
    console.error('트레이너 데이터를 가져오는데 실패했습니다:', error)
    return []
  }
}

// 센터별 트레이너 가져오기 (센터별 페이지용)
export async function getTrainersByCenter(center: string): Promise<Trainer[]> {
  try {
    const trainers = await client.fetch(queries.trainersByCenter, { center })
    if (!Array.isArray(trainers)) {
      console.warn(`트레이너 데이터가 배열이 아닙니다 (${center}):`, trainers)
      return []
    }
    return trainers.map(transformTrainer)
  } catch (error) {
    console.error(`센터별 트레이너 데이터를 가져오는데 실패했습니다 (${center}):`, error)
    return []
  }
}

export async function getTrainerBySlug(slug: string, center?: string): Promise<Trainer | null> {
  try {
    if (center) {
      // 센터가 지정된 경우 센터별 쿼리 사용
      const trainer = await client.fetch(queries.trainerBySlug, { slug, center })
      return trainer ? transformTrainer(trainer) : null
    } else {
      // 센터가 지정되지 않은 경우 전체에서 찾기 (후방 호환성)
      const allTrainersQuery = `*[_type == "trainer" && slug.current == $slug][0] {
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
      }`
      const trainer = await client.fetch(allTrainersQuery, { slug })
      return trainer ? transformTrainer(trainer) : null
    }
  } catch (error) {
    console.error(`트레이너 (${slug}) 데이터를 가져오는데 실패했습니다:`, error)
    return null
  }
}

// 리뷰 데이터 가져오기 함수들  
// 모든 센터의 리뷰 가져오기 (전체용)
export async function getReviews(): Promise<Review[]> {
  try {
    const reviews = await client.fetch(queries.reviews)
    // reviews가 배열이 아니거나 null/undefined인 경우 대비
    if (!Array.isArray(reviews)) {
      console.warn('리뷰 데이터가 배열이 아닙니다:', reviews)
      return []
    }
    return reviews.map(transformReview)
  } catch (error) {
    console.error('리뷰 데이터를 가져오는데 실패했습니다:', error)
    return []
  }
}

// 센터별 리뷰 가져오기 (센터별 페이지용)
export async function getReviewsByCenter(center: string): Promise<Review[]> {
  try {
    const reviews = await client.fetch(queries.reviewsByCenter, { center })
    if (!Array.isArray(reviews)) {
      console.warn(`리뷰 데이터가 배열이 아닙니다 (${center}):`, reviews)
      return []
    }
    return reviews.map(transformReview)
  } catch (error) {
    console.error(`센터별 리뷰 데이터를 가져오는데 실패했습니다 (${center}):`, error)
    return []
  }
}

export async function getReviewsByTrainer(trainerId: string, center?: string): Promise<Review[]> {
  try {
    if (center) {
      const reviews = await client.fetch(queries.reviewsByTrainer, { trainerId, center })
      return reviews.map(transformReview)
    } else {
      // 후방 호환성을 위해 센터 조건 없이 조회
      const allReviewsQuery = `*[_type == "review" && isPublished == true && trainer._ref == $trainerId] | order(createdAt desc) {
        _id,
        author,
        reviewContent,
        rating,
        source,
        createdAt,
        center
      }`
      const reviews = await client.fetch(allReviewsQuery, { trainerId })
      return reviews.map(transformReview)
    }
  } catch (error) {
    console.error(`트레이너 (${trainerId}) 리뷰를 가져오는데 실패했습니다:`, error)
    return []
  }
}

// 운동기구 데이터 가져오기 함수들
// 모든 센터의 운동기구 가져오기 (전체용)
export async function getEquipment(): Promise<Facility[]> {
  try {
    const equipment = await client.fetch(queries.equipment)
    return equipment.map(transformEquipment)
  } catch (error) {
    console.error('운동기구 데이터를 가져오는데 실패했습니다:', error)
    return []
  }
}

// 센터별 운동기구 가져오기 (센터별 페이지용)
export async function getEquipmentByCenter(center: string): Promise<Facility[]> {
  try {
    const equipment = await client.fetch(queries.equipmentByCenter, { center })
    return equipment.map(transformEquipment)
  } catch (error) {
    console.error(`센터별 운동기구 데이터를 가져오는데 실패했습니다 (${center}):`, error)
    return []
  }
}

export async function getEquipmentByCategory(category: string, center?: string): Promise<Facility[]> {
  try {
    if (center) {
      const equipment = await client.fetch(queries.equipmentByCategory, { category, center })
      return equipment.map(transformEquipment)
    } else {
      // 후방 호환성을 위해 센터 조건 없이 조회
      const allEquipmentQuery = `*[_type == "equipment" && isActive == true && category == $category] | order(name asc) {
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
      }`
      const equipment = await client.fetch(allEquipmentQuery, { category })
      return equipment.map(transformEquipment)
    }
  } catch (error) {
    console.error(`카테고리 (${category}) 운동기구를 가져오는데 실패했습니다:`, error)
    return []
  }
}

// 블로그 포스트 데이터 가져오기 함수들
// 모든 센터의 블로그 포스트 가져오기 (전체용)
export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const posts = await client.fetch(queries.blogPosts)
    return posts.map(transformBlogPost)
  } catch (error) {
    console.error('블로그 포스트 데이터를 가져오는데 실패했습니다:', error)
    return []
  }
}

// 센터별 블로그 포스트 가져오기 (센터별 페이지용)
export async function getBlogPostsByCenter(center: string): Promise<BlogPost[]> {
  try {
    const posts = await client.fetch(queries.blogPostsByCenter, { center })
    return posts.map(transformBlogPost)
  } catch (error) {
    console.error(`센터별 블로그 포스트 데이터를 가져오는데 실패했습니다 (${center}):`, error)
    return []
  }
}

export async function getBlogPostBySlug(slug: string, center?: string): Promise<BlogPost | null> {
  try {
    if (center) {
      const post = await client.fetch(queries.blogPostBySlug, { slug, center })
      return post ? transformBlogPost(post) : null
    } else {
      // 후방 호환성을 위해 센터 조건 없이 조회
      const allPostsQuery = `*[_type == "blogPost" && slug.current == $slug && isPublished == true][0] {
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
      }`
      const post = await client.fetch(allPostsQuery, { slug })
      return post ? transformBlogPost(post) : null
    }
  } catch (error) {
    console.error(`블로그 포스트 (${slug}) 데이터를 가져오는데 실패했습니다:`, error)
    return null
  }
}

export async function getFeaturedBlogPosts(center?: string): Promise<BlogPost[]> {
  try {
    if (center) {
      const posts = await client.fetch(queries.featuredBlogPosts, { center })
      return posts.map(transformBlogPost)
    } else {
      // 후방 호환성을 위해 센터 조건 없이 조회
      const allFeaturedQuery = `*[_type == "blogPost" && isPublished == true && featured == true] | order(publishedAt desc) [0...3] {
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
      }`
      const posts = await client.fetch(allFeaturedQuery)
      return posts.map(transformBlogPost)
    }
  } catch (error) {
    console.error('추천 블로그 포스트를 가져오는데 실패했습니다:', error)
    return []
  }
}

// 데이터 변환 함수들 - Sanity 데이터를 기존 타입 형식에 맞게 변환
// 트레이너 데이터 변환 함수 - Sanity 데이터를 애플리케이션 타입으로 변환
function transformTrainer(sanityTrainer: SanityTrainerRaw): Trainer {
  return {
    id: sanityTrainer._id,
    name: sanityTrainer.name,
    slug: sanityTrainer.slug?.current || '',
    images: sanityTrainer.profileImages || [], // 이미지 갤러리
    description: sanityTrainer.summary,
    experience: sanityTrainer.careers || [], // Rich Text 형태
    awards: sanityTrainer.awards || [], // Rich Text 형태
    certifications: sanityTrainer.certificates || [], // Rich Text 형태
    socialMedia: sanityTrainer.socialMedia || {},
    bookingUrl: sanityTrainer.bookingUrl // 예약 URL 추가
  }
}

// 리뷰 데이터 변환 함수 - Sanity 리뷰 데이터를 애플리케이션 타입으로 변환
function transformReview(sanityReview: SanityReviewRaw): Review {
  return {
    id: sanityReview._id,
    author: sanityReview.author,
    reviewContent: sanityReview.reviewContent, // reviewContent로 변경
    rating: sanityReview.rating,
    date: sanityReview.createdAt,
    source: sanityReview.source,
    trainer: sanityReview.trainer ? {
      _id: sanityReview.trainer._id,
      name: sanityReview.trainer.name,
      slug: sanityReview.trainer.slug.current // slug 객체에서 current 속성 추출
    } : undefined
  }
}

// 운동기구 데이터 변환 함수 - Sanity 운동기구 데이터를 시설 타입으로 변환
function transformEquipment(sanityEquipment: SanityEquipmentRaw): Facility {
  return {
    id: sanityEquipment._id,
    name: sanityEquipment.name,
    description: sanityEquipment.description,
    image: sanityEquipment.cover ? sanityEquipment.cover._ref : ''
  }
}

// 블로그 포스트 데이터 변환 함수 - Sanity 블로그 데이터를 애플리케이션 타입으로 변환
function transformBlogPost(sanityPost: SanityBlogPostRaw): BlogPost {
  return {
    id: sanityPost._id,
    title: sanityPost.title,
    excerpt: sanityPost.excerpt,
    date: sanityPost.publishedAt?.split('T')[0] || '',
    image: sanityPost.coverImage ? sanityPost.coverImage._ref : '',
    slug: sanityPost.slug?.current || '',
    publishedAt: sanityPost.publishedAt,
    content: sanityPost.content
  }
}

// === 센터 정보 관련 함수들 ===

// 모든 센터 정보 가져오기
export async function getAllCenterInfo(): Promise<CenterInfo[]> {
  try {
    const centerInfos = await client.fetch(queries.centerInfoAll)
    if (!Array.isArray(centerInfos)) {
      console.warn('센터 정보 데이터가 배열이 아닙니다:', centerInfos)
      return []
    }
    return centerInfos.map(transformCenterInfo)
  } catch (error) {
    console.error('센터 정보 데이터를 가져오는데 실패했습니다:', error)
    return []
  }
}

// 활성화된 센터 정보만 가져오기
export async function getActiveCenterInfo(): Promise<CenterInfo[]> {
  try {
    const centerInfos = await client.fetch(queries.activeCenterInfo)
    if (!Array.isArray(centerInfos)) {
      console.warn('활성 센터 정보 데이터가 배열이 아닙니다:', centerInfos)
      return []
    }
    return centerInfos.map(transformCenterInfo)
  } catch (error) {
    console.error('활성 센터 정보 데이터를 가져오는데 실패했습니다:', error)
    return []
  }
}

// 특정 센터 정보 가져오기 (centerId로 조회)
export async function getCenterInfoByCenterId(centerId: string): Promise<CenterInfo | null> {
  try {
    const centerInfo = await client.fetch(queries.centerInfoByCenterId, { centerId })
    return centerInfo ? transformCenterInfo(centerInfo) : null
  } catch (error) {
    console.error(`센터 정보 (${centerId})를 가져오는데 실패했습니다:`, error)
    return null
  }
}

// 센터 정보 데이터 변환 함수 - Sanity 센터 데이터를 애플리케이션 타입으로 변환
function transformCenterInfo(sanityCenterInfo: SanityCenterInfoRaw): CenterInfo {
  return {
    id: sanityCenterInfo._id,
    centerId: sanityCenterInfo.centerId,
    name: sanityCenterInfo.name,
    description: sanityCenterInfo.description,
    status: sanityCenterInfo.status,
    // 각 객체 필드에 대해 안전한 접근 처리 - 준비중인 센터에서 데이터가 없을 수 있음
    contact: sanityCenterInfo.contact || {
      phone: '',
      address: '',
      fullAddress: ''
    },
    businessHours: sanityCenterInfo.businessHours || {
      weekdays: { open: '', close: '', display: '' },
      weekends: { open: '', close: '', display: '' }
    },
    branding: {
      // primary, secondary는 로컬 컬러 상수에서 관리
      // branding 객체가 null/undefined일 수 있으므로 안전한 접근 처리
      // Sanity 이미지 참조를 실제 URL로 변환하여 저장
      logo: sanityCenterInfo.branding?.logo ? urlFor(sanityCenterInfo.branding.logo).url() : undefined,
      heroImage: sanityCenterInfo.branding?.heroImage ? urlFor(sanityCenterInfo.branding.heroImage).url() : undefined
    },
    directions: sanityCenterInfo.directions || {
      subway: [],
      bus: [],
      car: { address: '', parking: '' }
    },
    socialMedia: sanityCenterInfo.socialMedia || {},
    services: sanityCenterInfo.services || [],
    seo: sanityCenterInfo.seo || {
      keywords: [],
      metaTitle: '',
      metaDescription: ''
    }
  }
}

// === SEO Settings 관련 함수들 ===

// SEO Settings 가져오기 (단일 문서)
export async function getSEOSettings(): Promise<SEOSettings | null> {
  try {
    const seoSettings = await client.fetch(`
      *[_type == "seoSettings"][0] {
        _id,
        _type,
        rootPage {
          metaTitle,
          metaDescription,
          keywords,
          ogImage {
            asset,
            alt
          }
        },
        centers[] {
          centerId,
          mainPage {
            metaTitle,
            metaDescription,
            keywords,
            ogImage {
              asset,
              alt
            }
          },
          trainersPage {
            metaTitle,
            metaDescription,
            keywords
          },
          reviewsPage {
            metaTitle,
            metaDescription,
            keywords
          },
          postsPage {
            metaTitle,
            metaDescription,
            keywords
          },
          facilitiesPage {
            metaTitle,
            metaDescription,
            keywords
          }
        },
        trainers[] {
          slug,
          centerId,
          metaTitle,
          metaDescription,
          keywords
        }
      }
    `);
    
    return seoSettings || null;
  } catch (error) {
    console.error('SEO Settings 데이터를 가져오는데 실패했습니다:', error);
    return null;
  }
}

// 루트 페이지 SEO 데이터만 가져오기
export async function getRootPageSEO() {
  try {
    const seoSettings = await getSEOSettings();
    return seoSettings?.rootPage || null;
  } catch (error) {
    console.error('루트 페이지 SEO 데이터를 가져오는데 실패했습니다:', error);
    return null;
  }
}

// 센터별 페이지 SEO 데이터 가져오기
export async function getCenterPageSEO(centerId: string, pageType: 'mainPage' | 'trainersPage' | 'reviewsPage' | 'postsPage' | 'facilitiesPage') {
  try {
    const seoSettings = await getSEOSettings();
    const centerSEO = seoSettings?.centers?.find((c: SEOCenterPages) => c.centerId === centerId);
    return centerSEO?.[pageType] || null;
  } catch (error) {
    console.error(`센터(${centerId}) ${pageType} SEO 데이터를 가져오는데 실패했습니다:`, error);
    return null;
  }
}

// 트레이너별 SEO 데이터 가져오기
export async function getTrainerSEO(slug: string, centerId: string) {
  try {
    const seoSettings = await getSEOSettings();
    const trainerSEO = seoSettings?.trainers?.find((t: SEOTrainer) => t.slug === slug && t.centerId === centerId);
    return trainerSEO || null;
  } catch (error) {
    console.error(`트레이너(${slug}) SEO 데이터를 가져오는데 실패했습니다:`, error);
    return null;
  }
}

// 센터별 OG 이미지 가져오기 (센터 메인 + 하위 페이지 공용)
export async function getCenterOGImage(centerId: string) {
  try {
    const centerMainSEO = await getCenterPageSEO(centerId, 'mainPage');
    return centerMainSEO?.ogImage || null;
  } catch (error) {
    console.error(`센터(${centerId}) OG 이미지를 가져오는데 실패했습니다:`, error);
    return null;
  }
}
