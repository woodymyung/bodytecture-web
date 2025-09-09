import { client, queries } from './sanity'
import type { Trainer, Review, BlogPost, Facility } from '@/types'

// 트레이너 데이터 가져오기 함수들
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

export async function getTrainerBySlug(slug: string): Promise<Trainer | null> {
  try {
    const trainer = await client.fetch(queries.trainerBySlug, { slug })
    return trainer ? transformTrainer(trainer) : null
  } catch (error) {
    console.error(`트레이너 (${slug}) 데이터를 가져오는데 실패했습니다:`, error)
    return null
  }
}

// 리뷰 데이터 가져오기 함수들  
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

export async function getReviewsByTrainer(trainerId: string): Promise<Review[]> {
  try {
    const reviews = await client.fetch(queries.reviewsByTrainer, { trainerId })
    return reviews.map(transformReview)
  } catch (error) {
    console.error(`트레이너 (${trainerId}) 리뷰를 가져오는데 실패했습니다:`, error)
    return []
  }
}

// 운동기구 데이터 가져오기 함수들
export async function getEquipment(): Promise<Facility[]> {
  try {
    const equipment = await client.fetch(queries.equipment)
    return equipment.map(transformEquipment)
  } catch (error) {
    console.error('운동기구 데이터를 가져오는데 실패했습니다:', error)
    return []
  }
}

export async function getEquipmentByCategory(category: string): Promise<Facility[]> {
  try {
    const equipment = await client.fetch(queries.equipmentByCategory, { category })
    return equipment.map(transformEquipment)
  } catch (error) {
    console.error(`카테고리 (${category}) 운동기구를 가져오는데 실패했습니다:`, error)
    return []
  }
}

// 블로그 포스트 데이터 가져오기 함수들
export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const posts = await client.fetch(queries.blogPosts)
    return posts.map(transformBlogPost)
  } catch (error) {
    console.error('블로그 포스트 데이터를 가져오는데 실패했습니다:', error)
    return []
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const post = await client.fetch(queries.blogPostBySlug, { slug })
    return post ? transformBlogPost(post) : null
  } catch (error) {
    console.error(`블로그 포스트 (${slug}) 데이터를 가져오는데 실패했습니다:`, error)
    return null
  }
}

export async function getFeaturedBlogPosts(): Promise<BlogPost[]> {
  try {
    const posts = await client.fetch(queries.featuredBlogPosts)
    return posts.map(transformBlogPost)
  } catch (error) {
    console.error('추천 블로그 포스트를 가져오는데 실패했습니다:', error)
    return []
  }
}

// 데이터 변환 함수들 - Sanity 데이터를 기존 타입 형식에 맞게 변환
function transformTrainer(sanityTrainer: any): Trainer {
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

function transformReview(sanityReview: any): Review {
  return {
    id: sanityReview._id,
    author: sanityReview.author,
    reviewContent: sanityReview.reviewContent, // reviewContent로 변경
    rating: sanityReview.rating,
    date: sanityReview.createdAt,
    source: sanityReview.source,
    trainer: sanityReview.trainer // 🎯 trainer 정보 추가 (있는 경우만)
  }
}

function transformEquipment(sanityEquipment: any): Facility {
  return {
    id: sanityEquipment._id,
    name: sanityEquipment.name,
    description: sanityEquipment.description,
    image: sanityEquipment.cover ? `${sanityEquipment.cover.asset._ref}` : ''
  }
}

function transformBlogPost(sanityPost: any): BlogPost {
  return {
    id: sanityPost._id,
    title: sanityPost.title,
    excerpt: sanityPost.excerpt,
    date: sanityPost.publishedAt?.split('T')[0] || '',
    image: sanityPost.coverImage ? `${sanityPost.coverImage.asset._ref}` : '',
    slug: sanityPost.slug?.current || '',
    publishedAt: sanityPost.publishedAt,
    content: sanityPost.content
  }
}
