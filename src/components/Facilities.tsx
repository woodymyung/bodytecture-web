'use client';

import React from 'react';
import Image from 'next/image';
import InfiniteSwipeSlider, { SliderItem } from './InfiniteSwipeSlider';
import { Facility } from '@/types';

/**
 * Facilities 컴포넌트 - 서버에서 가져온 시설 정보를 표시
 * CORS 에러 해결을 위해 props로 데이터를 받아 처리함
 */

interface FacilitiesProps {
  facilities: Facility[];    // 서버에서 가져온 시설 데이터
  showSlider?: boolean;      // 슬라이더 표시 여부
  showStats?: boolean;       // 통계 정보 표시 여부
  cardMode?: boolean;        // 카드 모드 (메인 페이지용)
  showViewMore?: boolean;    // "더 보기" 버튼 표시 여부 (카드 모드에서만 사용)
  currentCenter?: string;    // 현재 센터 (더 보기 링크용)
  className?: string;        // 추가 CSS 클래스
}

const Facilities: React.FC<FacilitiesProps> = ({ 
  facilities = [],
  showSlider = true,
  showStats = true,
  cardMode = false,
  className = ''
}) => {
  // 시설 데이터가 없는 경우 처리
  if (facilities.length === 0) {
    return (
      <div className={`py-8 ${className}`}>
        <div className="flex justify-center items-center h-32">
            <div className="text-gray-500">등록된 시설 정보가 없습니다.</div>
          </div>
        </div>
    );
  }

  // 🎯 cover.url이 없는 항목 필터링 (데이터 유효성 검사)
  const validFacilities = facilities.filter(facility => facility.cover?.url);

  // 슬라이더 아이템 생성
  const sliderItems: SliderItem[] = validFacilities.map((facility, index) => ({
    id: facility.id,
    content: (
      <div className="relative w-full h-full">
        <Image
          src={facility.cover.url}
          alt={facility.cover.alt || facility.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 80vw"
          priority={index === 0}
          quality={85}
        />
        {/* 오버레이 정보 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
          <div className="text-white p-6 w-full">
            <h3 className="text-xl md:text-2xl font-bold mb-2">
              {facility.title}
            </h3>
            <p className="text-sm md:text-base opacity-90 line-clamp-2">
              {facility.description}
            </p>
            {/* 시설 유형 뱃지 */}
            <span className="inline-block mt-2 px-3 py-1 text-xs font-medium bg-white/20 rounded-full">
                시설 안내
              </span>
          </div>
        </div>
      </div>
    )
  }));

  // 시설 총 개수
  const totalFacilities = validFacilities.length;

  // 카드 모드일 때는 다른 렌더링
  if (cardMode) {
  return (
      <section id="facilities" className={`py-16 bg-white ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 섹션 제목 */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              시설 안내
          </h2>
          </div>

          {/* 시설 카드 리스트 - 이미지 위에 오버레이 형태로 배치 */}
          <div className="space-y-8">
            {validFacilities.map((facility) => (
              <div key={facility.id} className="relative overflow-hidden rounded-2xl shadow-lg group hover:shadow-xl transition-shadow duration-300">
                {/* 배경 이미지 */}
                <div className="relative w-full h-[24rem] md:h-[32rem] lg:h-[36rem]">
                  <Image
                    src={facility.cover.url}
                    alt={facility.cover.alt || facility.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 80vw"
                  />
                  
                  {/* 하단 집중 그라데이션 오버레이 - 하단 1/3 높이만 차지 */}
                  <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/90 to-transparent"></div>
                  
                  {/* 텍스트 콘텐츠 - 하단에 배치 */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-2xl">
                      {facility.title}
                    </h3>
                    <p className="text-white/90 text-lg md:text-xl leading-relaxed max-w-4xl drop-shadow-md">
                      {facility.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 더 보기 버튼 */}
          {/* {showViewMore && currentCenter && (
            <div className="text-center mt-12">
              <Link
                href={`/${currentCenter}/facilities`}
                className="inline-flex items-center px-8 py-3 bg-[var(--center-primary)] text-white font-semibold rounded-full hover:opacity-90 transition-opacity duration-200"
              >
                시설 자세히 보기
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          )} */}
        </div>
      </section>
    );
  }

  return (
    <section className={`py-8 ${className}`}>
      {/* 시설 이미지 슬라이더 */}
      {showSlider && validFacilities.length > 0 && (
        <div className="mb-8">
            <InfiniteSwipeSlider
              items={sliderItems}
              options={{
                autoPlay: true,
                autoPlayInterval: 4000,
                showIndicators: true,
                showNavigation: false,
                enableSwipe: true,
              className: "h-80 md:h-96 rounded-lg overflow-hidden shadow-lg",
                slideClassName: "relative"
              }}
            />
          </div>
      )}

      {/* 시설 정보 카드 */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* 시설 안내 */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-center mb-4">
                <div className="bg-blue-500 p-3 rounded-full">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
            <div className="text-center">
            <h3 className="text-lg font-bold text-gray-900 mb-2">프리미엄 시설</h3>
            <p className="text-sm text-gray-600 mb-2">
              {totalFacilities}개의 시설 완비
                </p>
                <p className="text-xs text-gray-500">
              쾌적하고 넓은 운동 공간
                </p>
              </div>
            </div>

        {/* 최신 장비 */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-center mb-4">
                <div className="bg-green-500 p-3 rounded-full">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
            <div className="text-center">
            <h3 className="text-lg font-bold text-gray-900 mb-2">최신 장비</h3>
            <p className="text-sm text-gray-600 mb-2">
              프리미엄 운동기구
                </p>
                <p className="text-xs text-gray-500">
              최신식 운동기구 완비
                </p>
              </div>
            </div>

        {/* 편의 시설 */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-center mb-4">
                <div className="bg-purple-500 p-3 rounded-full">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="text-center">
            <h3 className="text-lg font-bold text-gray-900 mb-2">편의 시설</h3>
            <p className="text-sm text-gray-600 mb-2">
              샤워실 등 완비
                </p>
                <p className="text-xs text-gray-500">
              깔끔하고 쾌적한 시설
                </p>
              </div>
            </div>
          </div>

          {/* 시설 통계 정보 */}
      {showStats && (
        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-6 bg-white rounded-full px-6 py-3 shadow-sm">
              <div className="text-center">
              <div className="text-xl font-bold text-gray-900">{validFacilities.length}</div>
              <div className="text-xs text-gray-600">총 시설</div>
              </div>
            <div className="w-px h-6 bg-gray-300"></div>
              <div className="text-center">
              <div className="text-xl font-bold text-green-600">최신</div>
              <div className="text-xs text-gray-600">기구</div>
                </div>
            <div className="w-px h-6 bg-gray-300"></div>
              <div className="text-center">
              <div className="text-xl font-bold text-blue-600">쾌적</div>
              <div className="text-xs text-gray-600">환경</div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Facilities;