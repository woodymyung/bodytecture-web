'use client'; // 클라이언트 컴포넌트로 변경 - onClick 이벤트 핸들러 사용을 위해

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Trainer } from '@/types';
import { getHighQualityImageUrl } from '@/lib/sanity';
import { COMPANY_INFO } from '@/constants/contact';

// 트레이너 정보 컴포넌트 - 4분할 그리드 레이아웃
interface TrainersProps {
  trainers?: Trainer[];
  hideHeader?: boolean; // 🎯 헤더 숨김 옵션 추가
}

const Trainers: React.FC<TrainersProps> = ({ trainers = [], hideHeader = false }) => {
  // 데이터 로딩 상태 확인
  if (!trainers || trainers.length === 0) {
    return (
      <section id="trainers" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 🎯 hideHeader prop에 따라 조건적으로 헤더 렌더링 */}
          {!hideHeader && (
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                전문 트레이너
              </h2>
              <p className="text-lg text-gray-600">
                트레이너 정보를 불러오고 있습니다...
              </p>
            </div>
          )}
        </div>
      </section>
    )
  }

  return (
    <section id="trainers" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 🎯 hideHeader prop에 따라 조건적으로 헤더 렌더링 */}
        {!hideHeader && (
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              전문 트레이너
            </h2>
            <p className="text-lg text-gray-600">
              {COMPANY_INFO.name}의 전문 트레이너들을 소개합니다
            </p>
          </div>
        )}

        {/* 4분할 그리드 레이아웃 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trainers.map((trainer: Trainer) => (
            <Link
              key={trainer.id}
              href={`/trainers/${trainer.slug}`}
              className="block bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer"
            >
              {/* 트레이너 이미지 */}
              <div className="aspect-square bg-gray-200 flex items-center justify-center overflow-hidden relative">
                {trainer.images && trainer.images.length > 0 ? (
                  <Image 
                    src={getHighQualityImageUrl(trainer.images[0].asset._ref, 450, 450, 88)} // 🎨 88% 고품질 컨잘이미지
                    alt={trainer.images[0].alt || trainer.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 450px"
                    quality={88}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center">
                    <span className="text-4xl font-bold text-red-600">
                      {trainer.name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>

              {/* 트레이너 정보 */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                  {trainer.name}
                </h3>

                {/* 트레이너 간단 소개 - summary를 3줄로 truncate */}
                {trainer.description && (
                  <div className="mb-4">
                    <div className="text-sm text-gray-600 leading-5 line-clamp-3">
                      {trainer.description}
                    </div>
                  </div>
                )}

                {/* 소셜 미디어 아이콘 - 버튼으로 변경하여 중첩 링크 방지 */}
                {trainer.socialMedia && (
                  <div className="flex justify-center space-x-3 mb-4">
                    {trainer.socialMedia.instagram && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(trainer.socialMedia!.instagram!, '_blank', 'noopener,noreferrer');
                        }}
                        className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200 relative z-10"
                        aria-label={`${trainer.name} 인스타그램`}
                      >
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      </button>
                    )}
                    {trainer.socialMedia.naverBlog && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(trainer.socialMedia!.naverBlog!, '_blank', 'noopener,noreferrer');
                        }}
                        className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200 relative z-10"
                        aria-label={`${trainer.name} 네이버 블로그`}
                      >
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M4 4h3v12.5l10-12.5h3v16h-3V7.5L7 20H4V4z"/>
                        </svg>
                      </button>
                    )}
                  </div>
                )}

                {/* 버튼 그룹 */}
                <div className="space-y-2">
                  {/* OT예약 버튼 (Primary) - 버튼으로 변경하여 중첩 링크 방지 */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (trainer.bookingUrl) {
                        window.open(trainer.bookingUrl, '_blank', 'noopener,noreferrer');
                      } else {
                        // 연락처 섹션으로 스크롤 또는 연락 페이지로 이동
                        const contactSection = document.getElementById('contact');
                        if (contactSection) {
                          contactSection.scrollIntoView({ behavior: 'smooth' });
                        } else {
                          window.location.href = '/#contact';
                        }
                      }
                    }}
                    className="w-full inline-flex items-center justify-center px-4 py-2 bg-red-600 text-white hover:bg-red-700 font-medium rounded-full transition-all duration-200 relative z-10"
                  >
                     상담 예약하기
                  </button>

                  {/* 자세히 보기 안내 텍스트 - 버튼 대신 안내 문구로 변경 */}
                  <div className="w-full text-center text-sm text-gray-500 py-1">
                    자세히 보기
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Trainers;
