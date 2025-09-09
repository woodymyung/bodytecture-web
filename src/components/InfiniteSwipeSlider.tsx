'use client';

import React, { useState, useEffect, ReactNode } from 'react';

// 슬라이더 아이템의 기본 구조
export interface SliderItem {
  id: string;
  content: ReactNode; // 슬라이드 내용 (이미지, 카드 등)
}

// 슬라이더 설정 옵션
export interface SliderOptions {
  autoPlay?: boolean; // 자동 재생 여부 (기본: true)
  autoPlayInterval?: number; // 자동 재생 간격 (ms, 기본: 4000)
  showIndicators?: boolean; // 인디케이터 표시 여부 (기본: true)
  showNavigation?: boolean; // 네비게이션 버튼 표시 여부 (기본: false)
  enableSwipe?: boolean; // 스와이프 기능 활성화 여부 (기본: true)
  swipeThreshold?: number; // 스와이프 임계값 (px, 기본: 50)
  className?: string; // 컨테이너 추가 클래스
  slideClassName?: string; // 슬라이드 추가 클래스
  indicatorPosition?: 'bottom' | 'top'; // 인디케이터 위치 (기본: 'bottom')
  currentIndex?: number; // 외부에서 제어하는 현재 인덱스
  onSlideChange?: (index: number) => void; // 슬라이드 변경 시 콜백
}

interface InfiniteSwipeSliderProps {
  items: SliderItem[];
  options?: SliderOptions;
}

// 재사용 가능한 무한 스와이프 슬라이더 컴포넌트
const InfiniteSwipeSlider: React.FC<InfiniteSwipeSliderProps> = ({ 
  items, 
  options = {} 
}) => {
  const {
    autoPlay = true,
    autoPlayInterval = 4000,
    showIndicators = true,
    showNavigation = false,
    enableSwipe = true,
    swipeThreshold = 50,
    className = '',
    slideClassName = '',
    indicatorPosition = 'bottom',
    currentIndex: externalCurrentIndex,
    onSlideChange
  } = options;

  const [currentIndex, setCurrentIndex] = useState(1); // 1부터 시작 (복제본 때문)
  const [isTransitioning, setIsTransitioning] = useState(true);
  
  // 스와이프 관련 상태
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

  // 빈 배열이거나 아이템이 없는 경우 처리
  if (!items || items.length === 0) {
    return <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
      <span className="text-gray-500">표시할 콘텐츠가 없습니다.</span>
    </div>;
  }

  // 아이템이 1개인 경우 무한 루프 없이 단일 아이템 표시
  if (items.length === 1) {
    return (
      <div className={`relative ${className}`}>
        <div className={`w-full ${slideClassName}`}>
          {items[0].content}
        </div>
      </div>
    );
  }

  // 무한 슬라이더를 위한 아이템 배열 (앞뒤에 복제본 추가)
  const infiniteItems = [
    items[items.length - 1], // 마지막 아이템 복제
    ...items,
    items[0] // 첫 번째 아이템 복제
  ];

  // 자동 재생 기능
  useEffect(() => {
    if (!autoPlay || isDragging) return;
    
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev + 1);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [autoPlay, autoPlayInterval, isDragging]);

  // 무한 루프를 위한 위치 리셋
  useEffect(() => {
    if (!isTransitioning) return;
    
    const timer = setTimeout(() => {
      if (currentIndex === 0) {
        setIsTransitioning(false);
        setCurrentIndex(items.length);
      } else if (currentIndex === infiniteItems.length - 1) {
        setIsTransitioning(false);
        setCurrentIndex(1);
      }
    }, 500); // 애니메이션 시간과 동일

    return () => clearTimeout(timer);
  }, [currentIndex, isTransitioning, items.length, infiniteItems.length]);


  const goToSlide = (index: number) => {
    setIsTransitioning(true);
    setCurrentIndex(index + 1); // 복제본 때문에 +1
    onSlideChange?.(index); // 외부에 슬라이드 변경 알림
  };

  const nextSlide = () => {
    setIsTransitioning(true);
    const newIndex = currentIndex + 1;
    setCurrentIndex(newIndex);
    // 외부 콜백 호출
    if (onSlideChange) {
      let actualIndex = newIndex - 1;
      if (newIndex === infiniteItems.length - 1) actualIndex = 0;
      onSlideChange(actualIndex);
    }
  };

  const prevSlide = () => {
    setIsTransitioning(true);
    const newIndex = currentIndex - 1;
    setCurrentIndex(newIndex);
    // 외부 콜백 호출
    if (onSlideChange) {
      let actualIndex = newIndex - 1;
      if (newIndex === 0) actualIndex = items.length - 1;
      onSlideChange(actualIndex);
    }
  };

  // 스와이프 핸들러들
  const handleStart = (clientX: number) => {
    if (!enableSwipe) return;
    setIsDragging(true);
    setStartX(clientX);
    setCurrentX(clientX);
  };

  const handleMove = (clientX: number) => {
    if (!isDragging || !enableSwipe) return;
    setCurrentX(clientX);
    const diff = clientX - startX;
    setDragOffset(diff);
  };

  const handleEnd = () => {
    if (!isDragging || !enableSwipe) return;
    
    const diff = currentX - startX;
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        prevSlide(); // 오른쪽으로 스와이프하면 이전 슬라이드
      } else {
        nextSlide(); // 왼쪽으로 스와이프하면 다음 슬라이드
      }
    }
    
    setIsDragging(false);
    setDragOffset(0);
    setStartX(0);
    setCurrentX(0);
  };

  // 터치 이벤트
  const handleTouchStart = (e: React.TouchEvent) => {
    handleStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    handleEnd();
  };

  // 마우스 이벤트
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault(); // 기본 드래그 동작 방지 
    handleStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      e.preventDefault(); // 기본 드래그 동작 방지
      handleMove(e.clientX);
    }
  };

  const handleMouseUp = () => {
    handleEnd();
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleEnd();
    }
  };

  // 전역 마우스 이벤트 (드래그 중일 때)
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDragging && enableSwipe) {
        e.preventDefault();
        handleMove(e.clientX);
      }
    };

    const handleGlobalMouseUp = () => {
      if (isDragging) {
        handleEnd();
      }
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleGlobalMouseMove, { passive: false });
      document.addEventListener('mouseup', handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging, enableSwipe, handleMove, handleEnd]);

  // 현재 보이는 실제 슬라이드 인덱스 계산 (인디케이터용)
  let actualIndex = currentIndex - 1;
  if (currentIndex === 0) actualIndex = items.length - 1;
  if (currentIndex === infiniteItems.length - 1) actualIndex = 0;

  // 외부에서 currentIndex가 변경될 때 동기화
  useEffect(() => {
    if (typeof externalCurrentIndex === 'number' && externalCurrentIndex !== actualIndex) {
      setIsTransitioning(true);
      setCurrentIndex(externalCurrentIndex + 1); // 복제본 때문에 +1
    }
  }, [externalCurrentIndex, actualIndex]);

  return (
    <div className="relative">
      {/* 상단 인디케이터 */}
      {showIndicators && indicatorPosition === 'top' && (
        <div className="flex justify-center mb-4 space-x-2">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                index === actualIndex ? 'bg-red-600' : 'bg-gray-300'
              }`}
              aria-label={`슬라이드 ${index + 1}번으로 이동`}
            />
          ))}
        </div>
      )}

      {/* 슬라이더 컨테이너 */}
      <div 
        className={`relative overflow-hidden rounded-lg ${enableSwipe ? 'cursor-grab active:cursor-grabbing select-none' : ''} ${className}`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className={`flex h-full ${isTransitioning ? 'transition-transform duration-500 ease-in-out' : ''}`}
          style={{ 
            transform: `translateX(-${currentIndex * 100}%) translateX(${isDragging ? dragOffset : 0}px)` 
          }}
        >
          {infiniteItems.map((item, index) => (
            <div key={`${item.id}-${index}`} className={`w-full flex-shrink-0 ${slideClassName}`}>
              {item.content}
            </div>
          ))}
        </div>
      </div>

      {/* 네비게이션 버튼 */}
      {showNavigation && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all duration-200"
            aria-label="이전 슬라이드"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all duration-200"
            aria-label="다음 슬라이드"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* 하단 인디케이터 */}
      {showIndicators && indicatorPosition === 'bottom' && (
        <div className="flex justify-center mt-4 space-x-2">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                index === actualIndex ? 'bg-red-600' : 'bg-gray-300'
              }`}
              aria-label={`슬라이드 ${index + 1}번으로 이동`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default InfiniteSwipeSlider;
