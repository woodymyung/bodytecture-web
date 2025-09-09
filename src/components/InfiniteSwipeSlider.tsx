'use client';

import React, { useState, useEffect, useCallback, ReactNode } from 'react';

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
  onSlideChange?: (index: number) => void; // 슬라이드 변경 콜백
  currentIndex?: number; // 외부에서 제어하는 현재 인덱스
}

// 무한 스와이프 슬라이더 컴포넌트
const InfiniteSwipeSlider: React.FC<{
  items: SliderItem[];
  options?: SliderOptions;
}> = ({ items, options = {} }) => {
  const {
    autoPlay = true,
    autoPlayInterval = 4000,
    showIndicators = true,
    showNavigation = false,
    enableSwipe = true,
    swipeThreshold = 50,
    className = '',
    slideClassName = '',
    onSlideChange,
    currentIndex: externalCurrentIndex
  } = options;

  // 상태 관리
  const [currentIndex, setCurrentIndex] = useState(1); // 첫 번째 복제본에서 시작
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

  // useCallback으로 감싼 핸들러 함수들
  const handleMove = useCallback((clientX: number) => {
    if (!isDragging || !enableSwipe) return;
    setCurrentX(clientX);
    const diff = clientX - startX;
    setDragOffset(diff);
  }, [isDragging, enableSwipe, startX]);

  const handleEnd = useCallback(() => {
    if (!isDragging || !enableSwipe) return;
    
    const diff = currentX - startX;
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        setIsTransitioning(true);
        setCurrentIndex(prev => prev - 1); // 이전 슬라이드
      } else {
        setIsTransitioning(true);
        setCurrentIndex(prev => prev + 1); // 다음 슬라이드
      }
    }

    setIsDragging(false);
    setDragOffset(0);
    setStartX(0);
    setCurrentX(0);
  }, [isDragging, enableSwipe, currentX, startX, swipeThreshold]);

  // 다음 슬라이드로 이동
  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(prev => prev + 1);
  }, [isTransitioning]);

  // 이전 슬라이드로 이동
  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(prev => prev - 1);
  }, [isTransitioning]);

  // 무한 슬라이더를 위한 아이템 배열 (앞뒤에 복제본 추가)
  const infiniteItems = items?.length > 0 ? [
    items[items.length - 1], // 마지막 아이템 복제
    ...items,
    items[0] // 첫 번째 아이템 복제
  ] : [];

  // 자동 재생 기능
  useEffect(() => {
    if (!autoPlay || isDragging || !items?.length || items.length <= 1) return;
    
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev + 1);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [autoPlay, autoPlayInterval, isDragging, items?.length]);

  // 무한 루프를 위한 위치 리셋
  useEffect(() => {
    if (!isTransitioning || !items?.length || items.length <= 1) return;
    
    const timer = setTimeout(() => {
      if (currentIndex === 0) {
        setIsTransitioning(false);
        setCurrentIndex(items.length);
      } else if (currentIndex === infiniteItems.length - 1) {
        setIsTransitioning(false);
        setCurrentIndex(1);
      } else {
        setIsTransitioning(false);
      }

      // 슬라이드 변경 콜백 호출
      if (onSlideChange) {
        let actualIndex = currentIndex - 1;
        if (currentIndex === 0) actualIndex = items.length - 1;
        if (currentIndex === infiniteItems.length - 1) actualIndex = 0;
        onSlideChange(actualIndex);
      }
    }, 500); // 애니메이션 시간과 동일

    return () => clearTimeout(timer);
  }, [isTransitioning, currentIndex, infiniteItems.length, onSlideChange, items?.length]);

  // 전역 마우스 이벤트 (드래그 중일 때)
  useEffect(() => {
    if (!items?.length || items.length <= 1) return;

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
  }, [isDragging, enableSwipe, handleMove, handleEnd, items?.length]);

  // 외부에서 currentIndex가 변경될 때 동기화
  useEffect(() => {
    if (!items?.length || items.length <= 1) return;
    
    const actualIndex = currentIndex - 1 >= items.length ? 0 : 
                      currentIndex - 1 < 0 ? items.length - 1 : 
                      currentIndex - 1;
    
    if (typeof externalCurrentIndex === 'number' && externalCurrentIndex !== actualIndex) {
      setIsTransitioning(true);
      setCurrentIndex(externalCurrentIndex + 1); // 복제본 때문에 +1
    }
  }, [externalCurrentIndex, currentIndex, items?.length]);

  // 빈 아이템 처리
  if (!items || items.length === 0) {
    return (
      <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
        <span className="text-gray-500">표시할 콘텐츠가 없습니다.</span>
      </div>
    );
  }

  // 아이템이 1개인 경우 무한 루프 없이 단일 아이템 표시
  if (items.length === 1) {
    return (
      <div className={`relative overflow-hidden h-full ${className}`}>
        <div className={`w-full h-full ${slideClassName}`}>
          {items[0].content}
        </div>
      </div>
    );
  }

  // 스와이프 핸들러들
  const handleStart = (clientX: number) => {
    if (!enableSwipe) return;
    setIsDragging(true);
    setStartX(clientX);
    setCurrentX(clientX);
  };

  // 마우스 이벤트 핸들러들
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !enableSwipe) return;
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    handleEnd();
  };

  // 터치 이벤트 핸들러들
  const handleTouchStart = (e: React.TouchEvent) => {
    handleStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !enableSwipe) return;
    handleMove(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    handleEnd();
  };

  // 현재 보이는 실제 슬라이드 인덱스 계산 (인디케이터용)
  let actualIndex = currentIndex - 1;
  if (currentIndex === 0) actualIndex = items.length - 1;
  if (currentIndex === infiniteItems.length - 1) actualIndex = 0;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* 슬라이드 컨테이너 */}
      <div
        className="flex h-full cursor-grab select-none"
        style={{
          transform: `translateX(calc(-${currentIndex * 100}% + ${dragOffset}px))`,
          transition: isTransitioning && !isDragging ? 'transform 0.5s ease-in-out' : 'none'
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        draggable={false}
      >
        {infiniteItems.map((item, index) => (
          <div key={`${item.id}-${index}`} className={`flex-shrink-0 w-full ${slideClassName}`}>
            {item.content}
          </div>
        ))}
      </div>

      {/* 네비게이션 버튼들 */}
      {showNavigation && (
        <>
          <button
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors z-10"
            onClick={prevSlide}
            aria-label="이전 슬라이드"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors z-10"
            onClick={nextSlide}
            aria-label="다음 슬라이드"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* 인디케이터 */}
      {showIndicators && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {items.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === actualIndex ? 'bg-white' : 'bg-white/50'
              }`}
              onClick={() => {
                setIsTransitioning(true);
                setCurrentIndex(index + 1);
              }}
              aria-label={`${index + 1}번째 슬라이드로 이동`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default InfiniteSwipeSlider;