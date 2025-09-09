'use client';

import React, { useState, useCallback, useMemo } from 'react';
// import { useEffect, useRef } from 'react'; // 현재 사용하지 않음
import { Review, Trainer } from '@/types';
import ReviewCard from './ReviewCard';
import ReviewFilter, { ReviewFilterState } from './ReviewFilter';
// import Contact from './Contact'; // 현재 사용하지 않음
// import Link from 'next/link'; // 현재 사용하지 않음

interface ReviewsPageContentProps {
  allReviews: Review[];
  trainers: Trainer[];
}

const ReviewsPageContent: React.FC<ReviewsPageContentProps> = ({
  allReviews,
  trainers
}) => {
  // 🎯 상태 관리
  const [filter, setFilter] = useState<ReviewFilterState>({
    reviewType: 'all',
    trainerId: 'all'
  });
  
  const [visibleCount, setVisibleCount] = useState(20); // 현재 표시되는 리뷰 개수
  const [loading, setLoading] = useState(false);

  // 🎯 필터에 따른 리뷰 필터링
  const filteredReviews = useMemo(() => {
    let filtered = allReviews;
    
    // 리뷰 타입 필터링
    if (filter.reviewType === 'general') {
      // 일반회원권: trainer가 없는 리뷰
      filtered = filtered.filter(review => !review.trainer);
    } else if (filter.reviewType === 'pt') {
      // PT: trainer가 있는 리뷰
      filtered = filtered.filter(review => !!review.trainer);
      
      // 특정 트레이너 필터링
      if (filter.trainerId !== 'all') {
        filtered = filtered.filter(review => review.trainer?._id === filter.trainerId);
      }
    }
    
    return filtered;
  }, [allReviews, filter]);

  // 🎯 현재 표시할 리뷰들
  const displayedReviews = useMemo(() => {
    return filteredReviews.slice(0, visibleCount);
  }, [filteredReviews, visibleCount]);

  // 🎯 더보기 가능 여부
  const hasMore = visibleCount < filteredReviews.length;

  // 🎯 필터 변경 핸들러
  const handleFilterChange = useCallback((newFilter: ReviewFilterState) => {
    setFilter(newFilter);
    setVisibleCount(20); // 필터 변경 시 처음부터 다시 시작
  }, []);

  // 🎯 더보기 버튼 클릭 핸들러
  const handleLoadMore = useCallback(() => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    
    // 클라이언트 사이드 처리로 빠른 로딩
    setTimeout(() => {
      setVisibleCount(prev => Math.min(prev + 20, filteredReviews.length));
      setLoading(false);
    }, 300);
  }, [loading, hasMore, filteredReviews.length]);

  return (
    <>
      {/* 🎯 리뷰 필터 섹션 */}
      <ReviewFilter
        trainers={trainers}
        filter={filter}
        onFilterChange={handleFilterChange}
        totalReviews={allReviews.length}
        filteredCount={filteredReviews.length}
      />

      {/* 전체 리뷰 목록 - Masonry 레이아웃 적용 */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 🎯 데이터가 없는 경우 */}
          {displayedReviews.length === 0 && !loading && (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                조건에 맞는 후기가 없습니다
              </h3>
              <p className="text-gray-600 mb-6">
                다른 조건으로 검색해보시거나 필터를 초기화해보세요.
              </p>
              <button
                onClick={() => handleFilterChange({ reviewType: 'all', trainerId: 'all' })}
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200"
              >
                필터 초기화
              </button>
            </div>
          )}

          {/* 🎯 Masonry 레이아웃으로 리뷰 표시 */}
          {displayedReviews.length > 0 && (
            <>
              <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
                {displayedReviews.map((review: Review) => (
                  <div key={review.id} className="break-inside-avoid mb-6">
                    <ReviewCard review={review} />
                  </div>
                ))}
              </div>

              {/* 🎯 더보기 버튼 */}
              {hasMore && (
                <div className="text-center py-12">
                  <button
                    onClick={handleLoadMore}
                    disabled={loading}
                    className="bg-red-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center mx-auto"
                  >
                    {loading ? (
                      <>
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 bg-white rounded-full animate-bounce"></div>
                          <div className="w-4 h-4 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-4 h-4 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          <span className="ml-2">로딩중...</span>
                        </div>
                      </>
                    ) : (
                      <>
                        후기 더보기
                      </>
                    )}
                  </button>
                </div>
              )}

            </>
          )}

        </div>
      </section>

    </>
  );
};

export default ReviewsPageContent;
