'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { reviews } from '@/data/mockData';
import { Review } from '@/types';

// 고객 후기 슬라이더 컴포넌트
const Reviews: React.FC = () => {
  const [reviewsData] = useState<Review[]>(reviews);
  const [loading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // 자동 슬라이드 기능
  useEffect(() => {
    if (reviewsData.length === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === reviewsData.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // 5초마다 슬라이드

    return () => clearInterval(timer);
  }, [reviewsData]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === reviewsData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? reviewsData.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            고객 후기
          </h2>
          <p className="text-lg text-gray-600">
            바디텍쳐를 이용하신 회원님들의 생생한 후기입니다
          </p>
        </div>

        {/* 슬라이더 컨테이너 */}
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden rounded-lg bg-white shadow-lg">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {reviewsData.map((review: Review) => (
                <div key={review.id} className="w-full flex-shrink-0">
                  <div className="p-8 md:p-12">
                    {/* 별점 */}
                    <div className="flex justify-center mb-6">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-6 h-6 text-yellow-400 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                    </div>

                    {/* 후기 내용 */}
                    <blockquote className="text-center mb-6">
                      <p className="text-lg md:text-xl text-gray-700 italic leading-relaxed">
                        &ldquo;{review.attributes?.content || review.content}&rdquo;
                      </p>
                    </blockquote>

                    {/* 작성자 정보 */}
                    <div className="text-center">
                      <p className="font-semibold text-gray-900">{review.attributes?.author || review.author}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {new Date(review.attributes?.date || review.attributes?.createdAt || review.date).toLocaleDateString('ko-KR')}
                        {review.attributes?.source && ` • ${review.attributes.source}`}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 네비게이션 버튼 */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all duration-200"
            aria-label="이전 후기"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all duration-200"
            aria-label="다음 후기"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* 인디케이터 */}
          <div className="flex justify-center mt-6 space-x-2">
            {reviewsData.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                  index === currentIndex ? 'bg-red-600' : 'bg-gray-300'
                }`}
                aria-label={`후기 ${index + 1}번으로 이동`}
              />
            ))}
          </div>
        </div>

        {/* 자세히 보기 버튼 */}
        <div className="text-center mt-8">
          <Link
            href="/reviews"
            className="bg-red-600 text-white hover:bg-red-700 font-semibold py-3 px-6 rounded-lg transition-colors duration-200 inline-block"
          >
            자세히 보기
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
