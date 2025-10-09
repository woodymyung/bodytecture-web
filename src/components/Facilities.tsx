'use client';

import React from 'react';
import Image from 'next/image';
import InfiniteSwipeSlider, { SliderItem } from './InfiniteSwipeSlider';

// 시설 이미지 데이터 - 웹 최적화된 JPEG 이미지 파일들 (원본 대비 95% 용량 절약)
const facilityImages = [
  {
    id: '1',
    name: '1층',
    image: '/images/1f_1.jpg',
    description: '넓고 쾌적한 메인 헬스장 공간'
  },
  {
    id: '2', 
    name: '1층',
    image: '/images/1f_2.jpg',
    description: '채광 좋은 무산소~유산소 공간'
  },
  {
    id: '3',
    name: '1층', 
    image: '/images/1f_3.jpg',
    description: '개방감 있는 운동 환경'
  },
  {
    id: '4',
    name: '1층',
    image: '/images/1f_4.jpg',
    description: '청계천이 보이는 밝은 공간'
  },
  {
    id: '5',
    name: '지하 1층',
    image: '/images/b1_1.jpg', 
    description: '지하 1층 운동 공간'
  },
  {
    id: '6',
    name: '지하 1층',
    image: '/images/b1_2.jpg',
    description: '추가 운동 기구 배치 공간'
  },
  {
    id: '7',
    name: '지하 1층',
    image: '/images/b1_3.jpg',
    description: '프라이빗한 운동 공간'
  }
];

// 시설 정보 컴포넌트 - 공통 무한 슬라이더 사용
const Facilities: React.FC = () => {
  // 슬라이더 아이템으로 변환
  const sliderItems: SliderItem[] = facilityImages.map((facility) => ({
    id: facility.id,
    content: (
      <div className="relative w-full h-full overflow-hidden">
        {/* 실제 시설 이미지 표시 - 안정적인 렌더링을 위해 수정 */}
        <Image
          src={facility.image}
          alt={facility.name}
          width={800}
          height={600}
          className="w-full h-full object-cover transition-opacity duration-300 pointer-events-none"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
          priority={parseInt(facility.id) <= 2} // 처음 2개 이미지만 우선 로딩
          quality={85} // JPEG 품질 85%로 설정
          loading={parseInt(facility.id) <= 2 ? 'eager' : 'lazy'} // 조건부 lazy loading
          draggable={false} // 이미지 드래그 방지
          onError={(e) => {
            console.error('이미지 로딩 오류:', facility.image, e);
          }}
          onLoad={() => {
            console.log('이미지 로딩 성공:', facility.image);
          }}
        />
        {/* 이미지 위 오버레이 텍스트 */}
        <div className="absolute inset-0 flex items-end">
          <div className="text-white px-6 py-4 w-full">
            <h3 className="text-xl font-bold mb-2 drop-shadow-lg">{facility.name}</h3>
            {/* <p className="text-sm opacity-90">{facility.description}</p> */}
          </div>
        </div>
      </div>
    )
  }));

  return (
    <section id="facilities" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            시설 정보
          </h2>
        </div>

        <div className="flex flex-col gap-12 items-center">
          {/* 공통 무한 스와이프 슬라이더 사용 */}
          <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <InfiniteSwipeSlider
              items={sliderItems}
              options={{
                autoPlay: true,
                autoPlayInterval: 4000,
                showIndicators: true,
                showNavigation: false,
                enableSwipe: true,
                swipeThreshold: 50,
                className: "h-96 md:h-[550px] bg-gray-200 shadow-lg",
                slideClassName: "relative"
              }}
            />
          </div>
        </div>

        {/* 시설 특징 요약 */}
        <div className="mt-16">

          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {/* 최대 수용 인원 */}
            <div className="bg-gray-50 rounded-xl p-6 transition-all duration-300">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-red-100 p-3 rounded-full">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-gray-900 mb-1">200명 정원제</div>
                <p className="text-sm text-gray-600 mt-1">최대 인원 제한으로 쾌적함 보장</p>
              </div>
            </div>

            {/* 층별 구성 */}
            <div className="bg-gray-50 rounded-xl p-6 transition-all duration-300">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-gray-900 mb-1">B1F~1F</div>
                <p className="text-sm text-gray-600 mt-1">청계천이 보이는 채광 좋은 1층부터<br></br>지하 1층까지 200평 규모의 시설</p>
              </div>
            </div>

            {/* 주차 공간 */}
            {/* <div className="bg-gray-50 rounded-xl p-6 transition-all duration-300">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-green-200 p-3 rounded-full">
                  <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center">
                    <span className="text-white font-bold text-2xl">P</span>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-gray-900 mb-1">무료 주차</div>
                <p className="text-sm text-gray-600 mt-1">최대 4대 무료 주차 가능</p>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Facilities;
