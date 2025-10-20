'use client';

import React, { useMemo, useCallback } from 'react';
import Link from 'next/link';
import { Review, SanityRichTextBlock, SanityRichTextSpan } from '@/types';
import ReviewCard from './ReviewCard';
import { getCenterColorClasses } from '@/constants/colors';

// 고객 후기 슬라이더 컴포넌트
interface ReviewsProps {
  reviews?: Review[];
  isMainPage?: boolean; // 메인 페이지에서 사용 시 모바일에서 텍스트 제한 적용
  currentCenter?: string; // 현재 센터 ID (센터별 페이지에서 전달)
}

const Reviews: React.FC<ReviewsProps> = ({ reviews = [], isMainPage = false, currentCenter }) => {
  // 센터별 버튼 컬러 클래스 가져오기
  const colorClasses = getCenterColorClasses(currentCenter || 'wangsimni');
  
  // 🎯 Rich Text를 일반 텍스트로 변환하여 글자 수 확인하는 함수
  // Rich Text를 일반 텍스트로 변환하여 글자 수 확인하는 함수 - Sanity Rich Text 블록 배열을 처리
  const convertRichTextToPlainText = useCallback((blocks: SanityRichTextBlock[]): string => {
    if (!blocks || !Array.isArray(blocks)) return '';
    
    return blocks
      .map(block => {
        if (block._type === 'block' && block.children) {
          return block.children
            .map((child: SanityRichTextSpan) => child.text || '')
            .join('');
        }
        return '';
      })
      .join(' '); // 블록 사이에 공백 추가
  }, []);

  // 🎯 최신순으로 정렬 + 메인페이지에서 100자 이상 필터링
  const sortedReviews = useMemo(() => {
    let filtered = [...reviews].sort((a, b) => {
      const aDate = new Date(a.date).getTime();
      const bDate = new Date(b.date).getTime();
      return bDate - aDate; // 내림차순 (최신순)
    });

    // 🎯 메인페이지에서만 100자 이상 필터링 적용
    if (isMainPage) {
      filtered = filtered.filter(review => {
        const plainText = convertRichTextToPlainText(review.reviewContent);
        return plainText.length >= 100;
      });
    }

    return filtered;
  }, [reviews, isMainPage, convertRichTextToPlainText]);

  // 🎯 데스크탑용 최대 27개, 모바일 슬라이더용 10개 제한
  const displayReviews = useMemo(() => {
    return sortedReviews.slice(0, isMainPage ? 27 : 10);
  }, [sortedReviews, isMainPage]);


  // 🎯 데이터가 없는 경우 처리 (Hook 사용 후 조건부 return)
  if (!reviews || reviews.length === 0) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              실제 고객 후기
            </h2>
            <p className="text-lg text-gray-600">
              고객 후기를 불러오고 있습니다...
            </p>
          </div>
          <div className="text-center">
            <p className="text-gray-500">
              Sanity Studio에서 리뷰를 추가해주세요!
              <br />
              <a href="https://bodytecture.sanity.studio/" target="_blank" rel="noopener noreferrer" className="text-red-600 underline">
                Studio 바로가기
              </a>
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            실제 고객 후기
          </h2>
        </div>

        {/* 🎯 데스크탑: 높이 제한된 3단 마손리 레이아웃 with 위로 이동 애니메이션 */}
        <div className="hidden lg:block relative py-8">
          <div className="max-w-7xl mx-auto px-4">
            {/* 🎯 높이 제한된 컨테이너 with 그림자 효과 */}
            <div className="relative max-h-[600px] overflow-hidden rounded-lg">
              {/* 🎯 위쪽 그림자 (페이드 인 효과) */}
              <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-gray-50 to-transparent z-10 pointer-events-none"></div>
              
              {/* 🎯 아래쪽 그림자 (페이드 아웃 효과) */}
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-50 to-transparent z-10 pointer-events-none"></div>
              
              {/* 🎯 위로 이동하는 애니메이션 컨테이너 */}
              <div className="animate-slide-up">
                {/* 🎯 3단 마손리 레이아웃 - 무한 루프를 위해 2번 반복 */}
                <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
                  {/* 첫 번째 세트 */}
                  {displayReviews.map((review) => (
                    <div key={`first-${review.id}`} className="break-inside-avoid mb-6 transform transition-all duration-300 hover:scale-105">
                      <ReviewCard review={review} isMainPage={isMainPage} currentCenter={currentCenter} />
                    </div>
                  ))}
                  {/* 두 번째 세트 (무한 루프용) */}
                  {displayReviews.map((review) => (
                    <div key={`second-${review.id}`} className="break-inside-avoid mb-6 transform transition-all duration-300 hover:scale-105">
                      <ReviewCard review={review} isMainPage={isMainPage} currentCenter={currentCenter} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 🎯 모바일: 왼쪽으로 흘러가는 자동 애니메이션 */}
        <div className="lg:hidden relative overflow-hidden py-4">
          {/* 그라디언트 페이드 효과 */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-gray-50 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-gray-50 to-transparent z-10"></div>
          
          {/* 수평 스크롤 컨테이너 */}
          <div className="animate-slide-left flex space-x-4 py-4">
            {/* 첫 번째 세트 */}
            {displayReviews.map((review) => (
              <div 
                key={`first-${review.id}`} 
                className="flex-shrink-0 w-80" // 고정 너비로 카드 크기 통일
              >
                <ReviewCard review={review} isMainPage={isMainPage} currentCenter={currentCenter} />
              </div>
            ))}
            {/* 두 번째 세트 (무한 루프용) */}
            {displayReviews.map((review) => (
              <div 
                key={`second-${review.id}`} 
                className="flex-shrink-0 w-80" // 고정 너비로 카드 크기 통일
              >
                <ReviewCard review={review} isMainPage={isMainPage} currentCenter={currentCenter} />
              </div>
            ))}
            {/* 세 번째 세트 (매끄러운 무한 루프용) */}
            {displayReviews.map((review) => (
              <div 
                key={`third-${review.id}`} 
                className="flex-shrink-0 w-80" // 고정 너비로 카드 크기 통일
              >
                <ReviewCard review={review} isMainPage={isMainPage} currentCenter={currentCenter} />
              </div>
            ))}
          </div>
        </div>

        {/* 전체 후기 보기 버튼 - 센터별 동적 컬러 적용 */}
        <div className="text-center mt-12">
          <Link
            href={currentCenter ? `/${currentCenter}/reviews` : "/reviews"}
            className={`text-xl ${colorClasses.bgPrimary} text-white hover:${colorClasses.bgAccent} font-semibold py-4 px-8 rounded-full transition-colors duration-200 inline-flex items-center shadow-lg hover:shadow-xl transform`}
          >
            전체 후기 보기
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
