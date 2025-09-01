// Strapi API 클라이언트
// Reviews와 Posts 데이터를 Strapi에서 가져오는 함수들

export const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
// 브라우저 환경에서는 NEXT_PUBLIC_ 접두사가 붙은 환경 변수만 접근 가능
const STRAPI_API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN ||
  'c6d03d9958d904f013e548e36f45f6b705a3f449f0fdc960d1c9a5944d15e37d375091306812ab7fd87e291e1fb6373a7790993bc953b9a9265fbc04547a89ed9af2c5a2f1d3c61aa42f1b6d94cc04d6e91ab83b391d0a38fc0c511152366e0dbb8469955de843856c415b07b2ad0602da93f76d7232ee646646a3329b06d640';

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
    console.log('🔍 Strapi API 요청:', url);

    const response = await fetch(url, {
      headers: getStrapiHeaders(),
      ...options,
    });

    if (!response.ok) {
      const errorMessage = `Strapi API error: ${response.status} ${response.statusText}`;
      console.error('❌ Strapi API 응답 에러:', errorMessage);
      throw new Error(errorMessage);
    }

    const data = await response.json();
    console.log('✅ Strapi API 응답 성공:', endpoint);
    return data;
  } catch (error) {
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      console.error('🚫 네트워크 연결 실패:', {
        url,
        endpoint,
        suggestion: 'Strapi 서버가 실행되고 있는지 확인해주세요.',
        fallback: '개발 환경에서는 mock 데이터로 대체됩니다.'
      });
    } else {
      console.error('❌ Strapi API 호출 실패:', error);
    }
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
    const data = response.data || [];
    console.log(`📊 리뷰 데이터 ${data.length}개 로드됨`);
    return data;
  } catch (error) {
    console.error('❌ 리뷰 데이터 로딩 실패:', error);
    // 에러 발생 시 빈 배열 반환 (상위 컴포넌트에서 mock 데이터로 처리)
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
