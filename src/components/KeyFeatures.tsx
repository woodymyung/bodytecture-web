// KeyFeatures 컴포넌트 - 센터별 핵심 특징을 반응형 3단 레이아웃으로 표시
'use client';

import React from 'react';
import type { KeyFeatures } from '@/types';

// 아이콘 가져오기 함수 - 모든 특징에 통일된 체크 아이콘 사용
const getIcon = (): React.JSX.Element => {
  return (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
};

// KeyFeatures 컴포넌트 props 타입 정의
interface KeyFeaturesProps {
  keyFeatures: KeyFeatures[];
}

// KeyFeatures 메인 컴포넌트 - 센터별 핵심 특징을 반응형 그리드로 표시
const KeyFeatures: React.FC<KeyFeaturesProps> = ({ keyFeatures }) => {
  // 활성화된 특징만 필터링하고 order순으로 정렬
  const activeFeatures = keyFeatures
    .filter(feature => feature.isActive)
    .sort((a, b) => a.order - b.order);

  // 특징이 없으면 렌더링하지 않음
  if (activeFeatures.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 섹션 헤더 */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            센터 특징
          </h2>
        </div>

        {/* 반응형 3단 그리드 - 모바일 1단, 태블릿 2단, 데스크탑 3단 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeFeatures.map((feature) => (
            <div 
              key={feature.id}
              className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center"
            >
              {/* 아이콘 영역 */}
              <div 
                className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
                style={{ 
                  backgroundColor: `var(--center-primary)`, 
                  color: 'white' 
                }}
              >
                {getIcon()}
              </div>

              {/* 제목 */}
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>

              {/* 설명 */}
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default KeyFeatures;
