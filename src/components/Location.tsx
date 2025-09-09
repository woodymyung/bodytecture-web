"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { CONTACT_INFO, COMPANY_INFO, SOCIAL_LINKS } from '@/constants/contact';

// 찾아오는 길 컴포넌트 - 정보 위계에 따라 재구성된 레이아웃
const Location: React.FC = () => {
  // 복사 상태 관리 - 각 정보별 복사 완료 피드백을 위한 상태
  const [copiedStates, setCopiedStates] = useState({
    address: false,
    phone: false
  });

  // 클립보드 복사 함수 - 사용자 편의성을 위한 원클릭 복사 기능
  const copyToClipboard = async (text: string, type: 'address' | 'phone') => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStates(prev => ({ ...prev, [type]: true }));
      
      // 2초 후 복사 상태 초기화
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [type]: false }));
      }, 2000);
    } catch (error) {
      console.error('클립보드 복사 실패:', error);
    }
  };

  return (
    <section id="location" className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 헤더: 제목과 핵심 정보 (박스 없이 간결하게) */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            찾아오는 길
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-lg text-gray-700">
            {/* 주소 정보 with 복사 버튼 */}
            <div className="flex items-center group">
              <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="mr-2">{CONTACT_INFO.fullAddress}</span>
              <button
                onClick={() => copyToClipboard(CONTACT_INFO.fullAddress, 'address')}
                className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-all duration-200 opacity-0 group-hover:opacity-100"
                title="주소 복사"
              >
                {copiedStates.address ? (
                  // 복사 완료 아이콘
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  // 복사 아이콘
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                )}
              </button>
            </div>
            
            {/* 전화번호 정보 with 복사 버튼 */}
            <div className="flex items-center group">
              <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="mr-2">{CONTACT_INFO.phone}</span>
              <button
                onClick={() => copyToClipboard(CONTACT_INFO.phone, 'phone')}
                className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-all duration-200 opacity-0 group-hover:opacity-100"
                title="전화번호 복사"
              >
                {copiedStates.phone ? (
                  // 복사 완료 아이콘
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  // 복사 아이콘
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* 메인 지도 (크게 중앙 배치) */}
        <div className="mb-20">
          <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 max-w-4xl mx-auto">
              <a
                href={SOCIAL_LINKS.naverMap.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative w-full h-full group"
              >
                <Image
                  src="/images/bodytecture_map.png"
                  alt="바디텍쳐 왕십리 청계점 위치 지도"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-center">
                  <div className="bg-white bg-opacity-90 text-gray-800 px-6 py-3 rounded-lg font-medium">
                      🗺️ 네이버 지도에서 보기
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>

        {/* 교통편별 안내 (카드 형태로 가로 배치) */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-4">교통편</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* 지하철 카드 */}
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  {/* 지하철 아이콘 - 전철 기차 모양 */}
                  <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2c-4 0-8 .5-8 4v9.5C4 17.43 5.57 19 7.5 19L6 20.5v.5h2.23l2-2h3.54l2 2H18v-.5L16.5 19c1.93 0 3.5-1.57 3.5-3.5V6c0-3.5-3.58-4-8-4zM7.5 17c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-6H6V6h12v5z"/>
                </svg>
                </div>
                <h4 className="text-xl font-semibold text-gray-900">지하철</h4>
              </div>
              <div className="space-y-4">
                    {CONTACT_INFO.directions.subway.map((subway, index) => (
                  <div key={index}>
                    <p className="font-medium text-gray-900 mb-1">
                          {subway.line} {subway.exit}
                        </p>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {subway.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

            {/* 버스 카드 */}
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                  {/* 버스 아이콘 - 실제 버스 모양 */}
                  <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18 11H6V6h12v5zM16.5 16c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5 1.5zM7.5 16c.83 0 1.5-.67 1.5-1.5S8.33 13 7.5 13s-1.5.67-1.5 1.5.67 1.5 1.5 1.5zm12.5-9c0-2.21-1.79-4-4-4H8c-2.21 0-4 1.79-4 4v9c0 1.1.89 2 2 2h1l1-1h8l1 1h1c1.1 0 2-.9 2-2V7z"/>
                  </svg>
                </div>
                <h4 className="text-xl font-semibold text-gray-900">버스</h4>
              </div>
              <div className="space-y-4">
                    {CONTACT_INFO.directions.bus.map((bus, index) => (
                  <div key={index}>
                    <p className="font-medium text-gray-900 mb-1">
                          {bus.busNumber} {bus.stop}
                        </p>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {bus.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

            {/* 자차 카드 */}
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                  {/* 자동차 주차 아이콘 - 실제 자동차 모양 */}
                  <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M5 11l1.5-4.5h11L19 11m-1.5 5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5m-11 0C5.67 16 5 15.33 5 14.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16M18.92 6c-.2-.58-.76-1-1.42-1H6.5c-.66 0-1.22.42-1.42 1L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-6z"/>
                  </svg>
                </div>
                <h4 className="text-xl font-semibold text-gray-900">주차</h4>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="font-medium text-gray-900 mb-1">
                    {CONTACT_INFO.directions.car.parking}
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed mb-3">
                    최대 4대 무료 주차 제공
                  </p>
                </div>
              </div>
                </div>
              </div>
            </div>

        {/* 운영시간 섹션 - 제목 위계만 맞추고 간단하게 구성 */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">운영시간</h3>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-lg text-gray-700">
            <div className="flex items-center">
                <svg className="w-5 h-5 mr-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              <span className="font-medium mr-2">평일 (월~금):</span>
              <span className="font-medium">{CONTACT_INFO.businessHours.weekdays.display}</span>
                </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium mr-2">주말 (토~일):</span>
              <span className="font-medium">{CONTACT_INFO.businessHours.weekends.display}</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Location;

