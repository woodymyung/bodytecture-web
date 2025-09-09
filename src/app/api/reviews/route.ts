// 리뷰 API 엔드포인트 - 무한스크롤 지원
import { NextRequest, NextResponse } from 'next/server';
import { client } from '@/lib/sanity';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  
  // 쿼리 파라미터 파싱
  const page = parseInt(searchParams.get('page') || '0');
  const limit = parseInt(searchParams.get('limit') || '20'); // 기본 20개씩 로딩
  const reviewType = searchParams.get('reviewType') || 'all';
  const trainerId = searchParams.get('trainerId') || 'all';
  
  const offset = page * limit;
  
  try {
    // 🎯 필터 조건에 따른 쿼리 생성
    let filterCondition = '*[_type == "review" && isPublished == true]';
    
    if (reviewType === 'general') {
      // 일반회원권: trainer가 없는 리뷰
      filterCondition = '*[_type == "review" && isPublished == true && !defined(trainer)]';
    } else if (reviewType === 'pt') {
      // PT: trainer가 있는 리뷰
      if (trainerId !== 'all') {
        // 특정 트레이너
        filterCondition = `*[_type == "review" && isPublished == true && trainer._ref == "${trainerId}"]`;
      } else {
        // 모든 PT 리뷰
        filterCondition = '*[_type == "review" && isPublished == true && defined(trainer)]';
      }
    }
    
    // 🎯 페이지네이션 적용된 쿼리
    const query = `${filterCondition} | order(createdAt desc) [${offset}...${offset + limit}] {
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
    }`;
    
    // 🎯 전체 개수 쿼리 (페이지네이션 정보용)
    const countQuery = `count(${filterCondition})`;
    
    // 병렬로 데이터와 전체 개수 조회
    const [reviews, totalCount] = await Promise.all([
      client.fetch(query),
      client.fetch(countQuery)
    ]);
    
    // 데이터 변환
    const transformedReviews = reviews.map((review: any) => ({
      id: review._id,
      author: review.author,
      reviewContent: review.reviewContent,
      rating: review.rating,
      date: review.createdAt,
      source: review.source,
      trainer: review.trainer
    }));
    
    return NextResponse.json({
      reviews: transformedReviews,
      pagination: {
        page,
        limit,
        total: totalCount,
        hasMore: offset + limit < totalCount,
        totalPages: Math.ceil(totalCount / limit)
      }
    });
    
  } catch (error) {
    console.error('리뷰 조회 오류:', error);
    return NextResponse.json(
      { error: '리뷰를 불러오는데 실패했습니다.' },
      { status: 500 }
    );
  }
}
