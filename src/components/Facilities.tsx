'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import InfiniteSwipeSlider, { SliderItem } from './InfiniteSwipeSlider';
import { client, queries, getHighQualityImageUrl } from '@/lib/sanity';
import { SanityFacilityRaw, Facility } from '@/types';

// 임시 Fallback 시설 데이터 (Sanity에 데이터가 없을 때 사용)
const getFallbackFacilities = (center: string): Facility[] => {
  const baseUrl = '/images/'; // public/images/ 폴더의 기존 이미지 사용
  
  return [
    {
      id: 'fallback-1',
      title: '메인 헬스장 1층',
      slug: 'main-gym-1f',
      type: 'landscape' as const,
      cover: {
        url: `${baseUrl}1f_1.jpg`,
        alt: '메인 헬스장 1층 전경',
      },
      description: '넓고 쾌적한 메인 헬스장 공간으로 청계천이 보이는 밝은 환경입니다.',
      order: 1,
      isActive: true,
      center,
      // 기존 호환성
      name: '메인 헬스장 1층',
      image: `${baseUrl}1f_1.jpg`
    },
    {
      id: 'fallback-2', 
      title: '유산소 운동 구역',
      slug: 'cardio-zone',
      type: 'landscape' as const,
      cover: {
        url: `${baseUrl}1f_2.jpg`,
        alt: '유산소 운동 구역',
      },
      description: '채광이 좋은 유산소 운동 전용 구역으로 다양한 기구들이 배치되어 있습니다.',
      order: 2,
      isActive: true,
      center,
      name: '유산소 운동 구역',
      image: `${baseUrl}1f_2.jpg`
    },
    {
      id: 'fallback-3',
      title: '지하 1층 운동 공간', 
      slug: 'b1-workout-space',
      type: 'equipment' as const,
      cover: {
        url: `${baseUrl}b1_1.jpg`,
        alt: '지하 1층 운동 공간',
      },
      description: '프라이빗한 지하 1층 운동 공간으로 집중적인 운동이 가능합니다.',
      order: 3,
      isActive: true,
      center,
      name: '지하 1층 운동 공간',
      image: `${baseUrl}b1_1.jpg`
    }
  ];
};

// Sanity 데이터를 애플리케이션 타입으로 변환하는 헬퍼 함수
function transformFacilityData(raw: SanityFacilityRaw): Facility {
  return {
    id: raw._id,
    title: raw.title,
    slug: raw.slug.current,
    type: raw.type,
    cover: {
      url: getHighQualityImageUrl(raw.cover, 800, 600, 90),
      alt: raw.cover.alt || raw.title,
      caption: raw.cover.caption
    },
    description: raw.description,
    additionalImages: raw.additionalImages?.map(img => ({
      url: getHighQualityImageUrl(img, 800, 600, 90),
      alt: img.alt || raw.title,
      caption: img.caption
    })),
    order: raw.order,
    isActive: raw.isActive,
    center: raw.center,
    features: raw.features,
    // 기존 호환성을 위한 필드들
    name: raw.title,
    image: getHighQualityImageUrl(raw.cover, 800, 600, 90)
  };
}

// Facilities 컴포넌트 Props 정의
interface FacilitiesProps {
  currentCenter?: string; // 현재 선택된 센터 (예: 'wangsimni', 'daechi', 'cheongdam')
}

// 시설 정보 컴포넌트 - Sanity CMS 데이터 기반 + 무한 슬라이더 사용
const Facilities: React.FC<FacilitiesProps> = ({ currentCenter = 'wangsimni' }) => {
  // 시설 데이터 상태 관리
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Sanity에서 센터별 시설 데이터 가져오기
  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // 센터별 시설 정보 쿼리 실행 - 더 견고한 에러 처리
        const rawData: SanityFacilityRaw[] = await client.fetch(
          queries.facilitiesByCenter,
          { center: currentCenter }
        ).catch((fetchError) => {
          // Sanity API 에러 상세 로깅
          console.error('Sanity API 요청 실패:', {
            error: fetchError,
            query: queries.facilitiesByCenter,
            params: { center: currentCenter },
            url: fetchError.response?.url
          });
          
          // 네트워크 에러와 데이터 없음을 구분
          if (fetchError.statusCode === 404 || fetchError.message?.includes('not found')) {
            return []; // 데이터가 없는 경우 빈 배열 반환
          }
          
          throw fetchError; // 다른 에러는 상위로 전파
        });

        // 데이터 변환 및 상태 업데이트 (null/undefined 체크 강화)
        const transformedData = Array.isArray(rawData) && rawData.length > 0
          ? rawData.filter(Boolean).map(transformFacilityData)
          : getFallbackFacilities(currentCenter); // Sanity 데이터가 없으면 fallback 사용
          
        setFacilities(transformedData);
        
        // 개발 환경에서 fallback 사용 시 알림
        if (process.env.NODE_ENV === 'development' && (!Array.isArray(rawData) || rawData.length === 0)) {
          console.warn('⚠️ Sanity에 facility 데이터가 없어 fallback 데이터를 사용 중입니다.');
          console.log('Sanity Studio에서 시설 데이터를 추가하세요: https://bodytecture.sanity.studio/');
        }
      } catch (err: unknown) {
        console.error('시설 정보 로딩 중 오류:', err);
        
        // 에러 타입별 메시지 분류
        let errorMessage = '시설 정보를 불러오는 중 문제가 발생했습니다.';
        
        // 에러 객체 타입 가드
        if (err && typeof err === 'object') {
          const error = err as { code?: string; message?: string; statusCode?: number };
          
          if (error.code === 'NETWORK_ERROR' || error.message?.includes('fetch')) {
            errorMessage = '네트워크 연결을 확인해주세요.';
          } else if (error.statusCode === 401) {
            errorMessage = 'API 권한 문제가 발생했습니다.';
          } else if (error.statusCode && error.statusCode >= 500) {
            errorMessage = '서버에 일시적인 문제가 발생했습니다. 잠시 후 다시 시도해주세요.';
          }
        }
        
        // 에러 발생 시에도 fallback 데이터 제공 (사용자 경험 향상)
        const fallbackData = getFallbackFacilities(currentCenter);
        setFacilities(fallbackData);
        
        // 개발 환경에서만 에러 표시, 프로덕션에서는 fallback으로 대체
        if (process.env.NODE_ENV === 'development') {
          setError(errorMessage);
        } else {
          console.warn('Sanity API 에러 발생, fallback 데이터 사용:', err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchFacilities();
  }, [currentCenter]);

  // 로딩 상태 처리
  if (loading) {
    return (
      <section id="facilities" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              시설 정보
            </h2>
          </div>
          <div className="flex justify-center items-center h-96">
            <div className="text-gray-500">시설 정보를 불러오는 중...</div>
          </div>
        </div>
      </section>
    );
  }

  // 에러 상태 처리
  if (error) {
    return (
      <section id="facilities" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              시설 정보
            </h2>
          </div>
          <div className="flex justify-center items-center h-96">
            <div className="text-red-500">{error}</div>
          </div>
        </div>
      </section>
    );
  }

  // 시설 데이터가 없는 경우 처리
  if (facilities.length === 0) {
    return (
      <section id="facilities" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              시설 정보
            </h2>
          </div>
          <div className="flex justify-center items-center h-96">
            <div className="text-gray-500">등록된 시설 정보가 없습니다.</div>
          </div>
        </div>
      </section>
    );
  }

  // 슬라이더 아이템으로 변환 - Sanity 데이터 기반
  const sliderItems: SliderItem[] = facilities.map((facility, index) => ({
    id: facility.id,
    content: (
      <div className="relative w-full h-full overflow-hidden">
        {/* Sanity에서 가져온 시설 이미지 표시 - 고품질 WebP 최적화 */}
        <Image
          src={facility.cover.url}
          alt={facility.cover.alt || facility.title}
          width={800}
          height={600}
          className="w-full h-full object-cover transition-opacity duration-300 pointer-events-none"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
          priority={index <= 1} // 처음 2개 이미지만 우선 로딩
          quality={90} // Sanity에서 이미 최적화된 고품질 이미지
          loading={index <= 1 ? 'eager' : 'lazy'} // 조건부 lazy loading
          draggable={false} // 이미지 드래그 방지
          onError={(e) => {
            console.error('시설 이미지 로딩 오류:', facility.cover.url, e);
          }}
          onLoad={() => {
            console.log('시설 이미지 로딩 성공:', facility.title);
          }}
        />
        {/* 이미지 위 오버레이 텍스트 - 시설 정보 표시 */}
        <div className="absolute inset-0 flex items-end">
          <div className="bg-gradient-to-t from-black/70 to-transparent text-white px-6 py-4 w-full">
            <h3 className="text-xl md:text-2xl font-bold mb-2 drop-shadow-lg">
              {facility.title}
            </h3>
            <p className="text-sm md:text-base opacity-90 line-clamp-2">
              {facility.description}
            </p>
            {/* 시설 유형 배지 표시 */}
            <div className="mt-2">
              <span className="inline-block px-3 py-1 text-xs font-medium bg-white/20 backdrop-blur-sm rounded-full">
                {facility.type === 'landscape' && '센터 전경'}
                {facility.type === 'equipment' && '운동 기구'}
                {facility.type === 'shower' && '샤워 시설'}
              </span>
            </div>
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

        {/* 시설 유형별 카드 그리드 - Sanity 데이터 기반 */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              시설 구성
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              센터 전경부터 최신 운동기구, 깔끔한 샤워시설까지 모든 시설을 확인해보세요
            </p>
          </div>

          {/* 시설 유형별 그리드 */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* 센터 전경 섹션 */}
            {facilities.filter(f => f.type === 'landscape').length > 0 && (
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 transition-all duration-300 hover:shadow-lg">
              <div className="flex items-center justify-center mb-4">
                  <div className="bg-blue-500 p-3 rounded-full">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
              </div>
              <div className="text-center">
                  <div className="text-xl font-bold text-gray-900 mb-1">센터 전경</div>
                  <p className="text-sm text-gray-600 mb-3">
                    {facilities.filter(f => f.type === 'landscape').length}개의 전경 사진
                  </p>
                  <p className="text-xs text-gray-500">
                    쾌적하고 넓은 공간에서 운동하세요
                  </p>
                </div>
              </div>
            )}

            {/* 운동기구 섹션 */}
            {facilities.filter(f => f.type === 'equipment').length > 0 && (
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 transition-all duration-300 hover:shadow-lg">
              <div className="flex items-center justify-center mb-4">
                  <div className="bg-green-500 p-3 rounded-full">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <div className="text-center">
                  <div className="text-xl font-bold text-gray-900 mb-1">운동 기구</div>
                  <p className="text-sm text-gray-600 mb-3">
                    {facilities.filter(f => f.type === 'equipment').length}개의 기구 소개
                  </p>
                  <p className="text-xs text-gray-500">
                    최신식 운동기구로 효과적인 운동을
                  </p>
                </div>
              </div>
            )}

            {/* 샤워시설 섹션 */}
            {facilities.filter(f => f.type === 'shower').length > 0 && (
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 transition-all duration-300 hover:shadow-lg">
              <div className="flex items-center justify-center mb-4">
                  <div className="bg-purple-500 p-3 rounded-full">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900 mb-1">샤워 시설</div>
                  <p className="text-sm text-gray-600 mb-3">
                    {facilities.filter(f => f.type === 'shower').length}개의 시설 소개
                  </p>
                  <p className="text-xs text-gray-500">
                    깔끔하고 쾌적한 샤워시설
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* 시설 통계 정보 */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center space-x-6 bg-white rounded-full px-8 py-4 shadow-md">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{facilities.length}</div>
                <div className="text-sm text-gray-600">총 시설</div>
              </div>
              <div className="w-px h-8 bg-gray-300"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {facilities.filter(f => f.features?.includes('24hours')).length > 0 ? '24H' : '운영'}
                </div>
                <div className="text-sm text-gray-600">운영시간</div>
              </div>
              <div className="w-px h-8 bg-gray-300"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {facilities.filter(f => f.features?.includes('premium')).length > 0 ? '프리미엄' : '고품질'}
                </div>
                <div className="text-sm text-gray-600">기구 등급</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Facilities;
