'use client';

import React, { useState, useCallback, useMemo } from 'react';
// import { useEffect, useRef } from 'react'; // 현재 사용하지 않음
import { Review } from '@/types';
import ReviewCard from './ReviewCard';

interface TrainerReviewsProps {
    trainerName: string;
    initialReviews: Review[];
}

const TrainerReviews: React.FC<TrainerReviewsProps> = ({
    trainerName,
    initialReviews
}) => {
    // 🎯 모든 리뷰를 20개씩 나누어서 표시하는 상태 관리
    const [visibleCount, setVisibleCount] = useState(20); // 현재 표시되는 리뷰 개수
    const [loading, setLoading] = useState(false);
    
    // 🎯 현재 표시할 리뷰들
    const displayedReviews = useMemo(() => {
        return initialReviews.slice(0, visibleCount);
    }, [initialReviews, visibleCount]);
    
    // 🎯 더 보기 가능 여부
    const hasMore = visibleCount < initialReviews.length;

    // 🎯 더보기 함수 (20개씩 추가)
    const loadMoreReviews = useCallback(() => {
        if (loading || !hasMore) return;
        
        setLoading(true);
        
        // 실제 환경에서는 서버 호출이지만, 여기서는 클라이언트 사이드 처리
        setTimeout(() => {
            setVisibleCount(prev => Math.min(prev + 20, initialReviews.length));
            setLoading(false);
        }, 500); // 빠른 로딩
    }, [loading, hasMore, initialReviews.length]);

    // 🎯 더보기 버튼 클릭 핸들러
    const handleLoadMore = useCallback(() => {
        loadMoreReviews();
    }, [loadMoreReviews]);

    if (initialReviews.length === 0) {
        return (
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                            {trainerName} 트레이너 후기
                        </h3>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            아직 {trainerName} 트레이너에 대한 리뷰가 없습니다.
                            <br />
                            첫 번째 리뷰를 남겨보세요!
                        </p>
                        <div className="mt-8">
                            <button className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors">
                                리뷰 작성하기
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* 섹션 헤더 */}
                <div className="text-center mb-12">
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">
                        {trainerName} 트레이너 후기
                    </h3>
                    <p className="text-lg text-gray-600">
                        실제 회원님들이 남긴 생생한 트레이닝 후기를 확인해보세요
                    </p>

                </div>

                {/* 리뷰 마손리 레이아웃 - 각 박스가 자신의 콘텐츠 높이에 맞춤 */}
                <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
                    {displayedReviews.map((review, index) => (
                        <div key={`${review.id}-${index}`} className="break-inside-avoid mb-6">
                            <ReviewCard review={review} clickable={false} />
                        </div>
                    ))}
                </div>

                {/* 🎯 더보기 버튼 */}
                {hasMore && (
                    <div className="text-center mt-12">
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


            </div>
        </section>
    );
};

export default TrainerReviews;
