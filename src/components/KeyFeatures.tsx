// KeyFeatures 컴포넌트 - 센터별 핵심 특징을 반응형 3단 레이아웃으로 표시
'use client';

import React from 'react';
import type { KeyFeatures } from '@/types';

// 아이콘 매핑 객체 - 아이콘 이름에 따라 SVG 아이콘 반환
const iconMap: Record<string, React.JSX.Element> = {
  gym: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  'personal-training': (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  locker: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
  ),
  equipment: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  parking: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 17l4 4 4-4m-4-5v9" />
    </svg>
  ),
  shower: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
  wifi: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
    </svg>
  ),
  air: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
    </svg>
  ),
  // 기본 아이콘 (매핑되지 않은 아이콘명에 대한 fallback)
  default: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  )
};

// 아이콘 가져오기 함수 - 모든 특징에 체크 아이콘 사용
const getIcon = (iconName: string): React.JSX.Element => {
  // 모든 특징에 통일된 체크 아이콘 사용
  return (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
};

// KeyFeatures 컴포넌트 props 타입 정의
interface KeyFeaturesProps {
  keyFeatures: KeyFeatures[];
  currentCenter?: string;
}

// KeyFeatures 메인 컴포넌트 - 센터별 핵심 특징을 반응형 그리드로 표시
const KeyFeatures: React.FC<KeyFeaturesProps> = ({ keyFeatures, currentCenter }) => {
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
                {getIcon(feature.icon)}
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
