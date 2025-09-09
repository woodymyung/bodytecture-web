'use client';

import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import { TrainerImage } from '@/types';
import { getHighQualityImageUrl } from '@/lib/sanity';
import InfiniteSwipeSlider, { SliderItem } from './InfiniteSwipeSlider';

interface TrainerImageGalleryProps {
  images: TrainerImage[];
  trainerName: string;
}

const TrainerImageGallery: React.FC<TrainerImageGalleryProps> = ({ images, trainerName }) => {
  // 현재 이미지 인덱스 상태 관리
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 슬라이더 아이템으로 변환
  const sliderItems: SliderItem[] = useMemo(() => {
    if (!images || images.length === 0) return [];
    
    return images.map((image, index) => ({
      id: `trainer-image-${index}`,
      content: (
        <div className="w-full h-full relative">
          <Image 
            src={getHighQualityImageUrl(image.asset._ref, 600, 600, 92)} // 🎨 92% 고품질 유지
            alt={image.alt || trainerName}
            fill
            className="object-cover" // rounded-2xl 제거 (컨테이너에서 처리)
            draggable={false}
            sizes="(max-width: 768px) 100vw, 600px"
            quality={92}
          />
        </div>
      )
    }));
  }, [images, trainerName]);

  // 슬라이드 변경 시 콜백
  const handleSlideChange = (index: number) => {
    setCurrentImageIndex(index);
  };


  if (!images || images.length === 0) {
    // 이미지가 없을 때 기본 아바타 표시
    return (
      <div className="aspect-square bg-gradient-to-br from-white/30 to-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm">
        <span className="text-8xl font-bold text-white drop-shadow-lg">
          {trainerName.charAt(0)}
        </span>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* 공통 무한 스와이프 슬라이더 - 썸네일 연동, 네비게이션 버튼 제거 */}
      <InfiniteSwipeSlider
        items={sliderItems}
        options={{
          autoPlay: false, // 트레이너 이미지는 수동 조작만
          showIndicators: images.length > 1, // 이미지가 2개 이상일 때만 인디케이터 표시
          showNavigation: false, // 네비게이션 버튼 제거 (인디케이터와 스와이프로 조작)
          enableSwipe: true, // 스와이프 항상 활성화 (이미지가 1개여도 제스처 인식)
          swipeThreshold: 50,
          className: "aspect-square bg-white bg-opacity-20 shadow-2xl overflow-hidden rounded-2xl",
          slideClassName: "relative",
          currentIndex: currentImageIndex, // 외부에서 제어
          onSlideChange: handleSlideChange // 슬라이드 변경 시 인덱스 동기화
        }}
      />


    </div>
  );
};

export default TrainerImageGallery;
