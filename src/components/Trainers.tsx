import React from 'react';
import Link from 'next/link';
import { trainers } from '@/data/mockData';
import { Trainer } from '@/types';

// 트레이너 정보 컴포넌트 - 4분할 그리드 레이아웃
const Trainers: React.FC = () => {
  return (
    <section id="trainers" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            전문 트레이너
          </h2>
          <p className="text-lg text-gray-600">
            바디텍쳐의 전문 트레이너들을 소개합니다
          </p>
        </div>

        {/* 4분할 그리드 레이아웃 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trainers.map((trainer: Trainer) => (
            <div
              key={trainer.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* 트레이너 이미지 */}
              <div className="aspect-square bg-gray-200 flex items-center justify-center">
                              <div className="w-full h-full bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center">
                <span className="text-4xl font-bold text-red-600">
                  {trainer.name.charAt(0)}
                </span>
              </div>
              </div>

              {/* 트레이너 정보 */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                  {trainer.name}
                </h3>

                {/* 경력 정보 */}
                {trainer.experience && trainer.experience.length > 0 && (
                  <div className="mb-4">
                    <ul className="text-sm text-gray-600 space-y-1">
                      {trainer.experience.slice(0, 3).map((exp, index) => (
                        <li key={index} className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2 flex-shrink-0"></span>
                          {exp}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* 소셜 미디어 아이콘 */}
                {trainer.socialMedia && (
                  <div className="flex justify-center space-x-3 mb-4">
                    {trainer.socialMedia.instagram && (
                      <a
                        href={trainer.socialMedia.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200"
                        aria-label={`${trainer.name} 인스타그램`}
                      >
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      </a>
                    )}
                    {trainer.socialMedia.naverBlog && (
                      <a
                        href={trainer.socialMedia.naverBlog}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200"
                        aria-label={`${trainer.name} 네이버 블로그`}
                      >
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M16.273 12.845L7.376 0H0v24h7.727V11.155L16.624 24H24V12.845z"/>
                        </svg>
                      </a>
                    )}
                  </div>
                )}

                {/* 버튼 그룹 */}
                <div className="space-y-2">
                  {/* OT예약 버튼 (Primary) */}
                  <Link
                    href="/#contact"
                    className="w-full inline-flex items-center justify-center px-4 py-2 bg-red-600 text-white hover:bg-red-700 font-medium rounded-lg transition-all duration-200"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    OT예약 상담
                  </Link>

                  {/* 자세히 보기 버튼 (Secondary) */}
                  <Link
                    href={`/trainers#trainer-${trainer.id}`}
                    className="w-full inline-flex items-center justify-center px-4 py-2 border border-red-600 text-red-600 hover:bg-red-600 hover:text-white font-medium rounded-lg transition-all duration-200"
                  >
                    자세히 보기
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Trainers;
