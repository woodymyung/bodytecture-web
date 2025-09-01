'use client';

import React from 'react';

// 히어로 섹션 - 메인 타이틀과 문의하기 버튼을 포함
const Hero: React.FC = () => {
  const handleContactClick = () => {
    // 외부 링크로 연결 (실제 구현 시 외부 서비스로 연결)
    window.open('https://example.com/contact', '_blank');
  };

  return (
    <section className="relative bg-black text-white">
      {/* 배경 오버레이 */}

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12">
        <div className="text-center">
          {/* 메인 타이틀 */}
          <h1 className="text-3xl md:text-6xl font-bold mb-6 leading-tight">
            바디텍쳐 왕십리 청계점에서 매일의 변화를 만들어보세요
          </h1>

          {/* 서브 타이틀 */}
          <p className="text-lg md:text-2xl mb-8 text-gray-300 mx-auto">
            지상 1층부터~지하 1층 nnn평 규모에 정원제로 운영되어 쾌적한 환경을 보장합니다
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
