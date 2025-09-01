// Strapi API 클라이언트
// Reviews와 Posts 데이터를 Strapi에서 가져오는 함수들

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

/**
 * Strapi API 기본 설정
 */
const getStrapiHeaders = () => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (STRAPI_API_TOKEN) {
    headers['Authorization'] = `Bearer ${STRAPI_API_TOKEN}`;
  }

  return headers;
};

/**
 * Strapi API 기본 fetch 함수
 */
export const strapiFetch = async (endpoint: string, options?: RequestInit) => {
  const url = `${STRAPI_URL}/api${endpoint}`;

  try {
    const response = await fetch(url, {
      headers: getStrapiHeaders(),
      ...options,
    });

    if (!response.ok) {
      throw new Error(`Strapi API error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Strapi API 호출 실패:', error);
    throw error;
  }
};

/**
 * 리뷰 데이터 가져오기
 * Strapi의 reviews 컬렉션에서 데이터를 조회
 */
export const getReviews = async () => {
  try {
    const response = await strapiFetch('/reviews?populate=*&sort=createdAt:desc');
    return response.data || [];
  } catch (error) {
    console.error('리뷰 데이터 로딩 실패:', error);
    return [];
  }
};

/**
 * 포스트 데이터 가져오기
 * Strapi의 posts 컬렉션에서 데이터를 조회
 */
export const getPosts = async () => {
  try {
    const response = await strapiFetch('/posts?populate=*&sort=publishedAt:desc');
    return response.data || [];
  } catch (error) {
    console.error('포스트 데이터 로딩 실패:', error);
    return [];
  }
};

/**
 * 특정 포스트 가져오기 (slug로 조회)
 */
export const getPostBySlug = async (slug: string) => {
  try {
    const response = await strapiFetch(`/posts?filters[slug][$eq]=${slug}&populate=*`);
    return response.data[0] || null;
  } catch (error) {
    console.error('포스트 조회 실패:', error);
    return null;
  }
};
