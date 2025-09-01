'use client';

import React from 'react';

// 히어로 섹션 - 메인 타이틀과 문의하기 버튼을 포함
const Hero: React.FC = () => {
  const handleContactClick = () => {
    // 외부 링크로 연결 (실제 구현 시 외부 서비스로 연결)
    window.open('https://example.com/contact', '_blank');
  };

  return (
    <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      {/* 배경 오버레이 */}
      <div className="absolute inset-0 bg-black bg-opacity-25"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="text-center">
          {/* 메인 타이틀 */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            바디텍쳐 왕십리 청계점은<br />
            <span className="text-blue-200">정원제로 운영되어</span><br />
            쾌적한 서비스를 제공합니다
          </h1>

          {/* 서브 타이틀 */}
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            지상 1층 ~ 지하 1층의 넓은 공간에서 최대 200명의 회원님들을 위해
            최적의 운동 환경을 제공합니다.
          </p>

          {/* 문의하기 버튼 */}
          <button
            onClick={handleContactClick}
            className="bg-white text-blue-600 hover:bg-blue-50 font-semibold py-4 px-8 rounded-lg text-lg transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            문의하기
          </button>
        </div>
      </div>

      {/* 데코레이션 요소 */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-12 md:h-20"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V120Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
