'use client';

import React from 'react';
import Image from 'next/image';
// import { COMPANY_INFO } from '@/constants/contact'; // 현재 사용하지 않음"

// 히어로 섹션 - 최적화된 이미지와 메인 타이틀을 포함
const Hero: React.FC = () => {
  // 문의하기 버튼 클릭 핸들러 (현재는 사용하지 않음)
  // const handleContactClick = () => {
  //   window.open('https://example.com/contact', '_blank');
  // };

  return (
    <section className="pt-20 relative bg-black text-white h-[400px] md:h-[500px] flex items-center overflow-hidden">
      {/* 반응형 최적화 이미지 - WebP 우선, JPEG 폴백 */}
      <picture className="absolute inset-0">
        {/* 모바일용 WebP (768px 이하) */}
        <source 
          media="(max-width: 768px)" 
          srcSet="/images/bodytecture_cover_mobile.webp" 
          type="image/webp" 
        />
        {/* 모바일용 JPEG 폴백 */}
        <source 
          media="(max-width: 768px)" 
          srcSet="/images/bodytecture_cover_mobile.jpg" 
          type="image/jpeg" 
        />
        {/* 데스크톱용 WebP */}
        <source 
          srcSet="/images/bodytecture_cover.webp" 
          type="image/webp" 
        />
        {/* 데스크톱용 JPEG 폴백 */}
        <source 
          srcSet="/images/bodytecture_cover_optimized.jpg" 
          type="image/jpeg" 
        />
        {/* Next.js Image 컴포넌트로 폴백 */}
        <Image
          src="/images/bodytecture_cover_optimized.jpg"
          alt="바디텍쳐 왕십리 청계점 헬스장 내부"
          fill
          priority
          className="object-cover object-center"
          sizes="(max-width: 768px) 768px, 1920px"
          quality={85}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
        />
      </picture>
      
      {/* 배경 이미지 오버레이 - 텍스트 가독성을 위한 어두운 오버레이 */}
      <div className="absolute inset-0 bg-black/50 z-10"></div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-20">
        <div className="text-center">
          {/* 메인 타이틀 */}
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            매일의 변화를 만들어보세요
          </h1>

          {/* 서브 타이틀 */}
          <p className="text-lg md:text-2xl mb-8 text-gray-300 mx-auto">
            지상 1층부터 지하 1층까지 최대 200명 정원제로 운영되어 쾌적한 환경을 보장합니다
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
