'use client';

import React from 'react';
import Link from 'next/link';
import { getAllCenters, type CenterInfo } from '@/constants/centers';

// 센터 선택 페이지 컴포넌트
// 3개 센터 중 하나를 선택할 수 있는 카드형 인터페이스 제공
const CenterSelection: React.FC = () => {
  // 모든 센터 정보 가져오기
  const centers = getAllCenters();

  // 센터 카드 컴포넌트
  const CenterCard: React.FC<{ center: CenterInfo }> = ({ center }) => {
    const isActive = center.status === 'active';
    const href = isActive ? `/${center.id}` : '#';

    return (
      <div className="group relative">
        {isActive ? (
          <Link href={href}>
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:scale-105 p-8 border-2 border-transparent group-hover:border-gray-200">
              {/* 센터 상태 표시 */}
              <div className="flex items-center justify-between mb-6">
                <div 
                  className="px-4 py-2 rounded-full text-sm font-bold text-white"
                  style={{ backgroundColor: center.branding.primary }}
                >
                  운영중
                </div>
                <div className="w-6 h-6 text-gray-400 group-hover:text-gray-600 transition-colors">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

              {/* 센터 정보 */}
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {center.name}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {center.description}
                </p>
                
                {/* 위치 정보 */}
                <div className="flex items-center justify-center text-sm text-gray-500 mb-4">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {center.contact.address}
                </div>

                {/* 운영시간 */}
                <div className="text-sm text-gray-500">
                  평일: {center.businessHours.weekdays.display}
                </div>
              </div>

              {/* 호버 효과용 그라데이션 */}
              <div 
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-300"
                style={{ 
                  background: `linear-gradient(135deg, ${center.branding.primary} 0%, ${center.branding.secondary} 100%)`
                }}
              />
            </div>
          </Link>
        ) : (
          // 준비중인 센터 (청담점)
          <div className="bg-gray-50 rounded-2xl shadow-lg p-8 border-2 border-gray-200 opacity-60">
            {/* 센터 상태 표시 */}
            <div className="flex items-center justify-between mb-6">
              <div className="px-4 py-2 rounded-full text-sm font-bold bg-gray-400 text-white">
                준비중
              </div>
              <div className="w-6 h-6 text-gray-300">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </div>

            {/* 센터 정보 */}
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-500 mb-3">
                {center.name}
              </h3>
              <p className="text-gray-400 mb-4 leading-relaxed">
                {center.description}
              </p>
              
              {/* 준비중 메시지 */}
              <div className="flex items-center justify-center text-sm text-gray-400 mb-4">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                곧 만나뵙겠습니다
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* 헤더 섹션 */}
      <section className="pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* 로고 또는 브랜드 영역 */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
              BODY<span className="text-red-600">TECTURE</span>
            </h1>
            <div className="w-24 h-1 bg-red-600 mx-auto rounded-full"></div>
          </div>

          {/* 메인 타이틀 */}
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            어떤 센터를 확인하시겠어요?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            가까운 지점을 선택하여 전문 트레이닝 서비스를 경험해보세요
          </p>
        </div>
      </section>

      {/* 센터 선택 카드 섹션 */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {centers.map((center) => (
              <CenterCard key={center.id} center={center} />
            ))}
          </div>
        </div>
      </section>

      {/* 하단 안내 메시지 */}
      <section className="pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-500">
            각 센터는 고유한 서비스와 전문 트레이너를 보유하고 있습니다
          </p>
        </div>
      </section>
    </div>
  );
};

export default CenterSelection;
