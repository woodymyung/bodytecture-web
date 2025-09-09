'use client';

import React, { useState } from 'react';
import { Trainer } from '@/types';

export interface ReviewFilterState {
  reviewType: 'all' | 'general' | 'pt'; // 전체, 일반회원권, PT
  trainerId: string | 'all'; // 전체 또는 특정 트레이너 ID
}

interface ReviewFilterProps {
  trainers: Trainer[];
  filter: ReviewFilterState;
  onFilterChange: (filter: ReviewFilterState) => void;
  totalReviews: number;
  filteredCount: number;
}

const ReviewFilter: React.FC<ReviewFilterProps> = ({
  trainers,
  filter,
  onFilterChange
}) => {
  const [reviewTypeOpen, setReviewTypeOpen] = useState(false);
  const [trainerOpen, setTrainerOpen] = useState(false);

  const handleReviewTypeChange = (reviewType: ReviewFilterState['reviewType']) => {
    // PT가 아닌 경우 트레이너 필터 초기화
    if (reviewType !== 'pt') {
      onFilterChange({ reviewType, trainerId: 'all' });
    } else {
      onFilterChange({ ...filter, reviewType });
    }
    setReviewTypeOpen(false);
  };

  const handleTrainerChange = (trainerId: string) => {
    onFilterChange({ ...filter, trainerId });
    setTrainerOpen(false);
  };

  // 후기 종류별 라벨 매핑
  const reviewTypeLabels = {
    all: '전체',
    general: '일반회원권',
    pt: 'PT 수업'
  };

  // 선택된 트레이너 이름 가져오기
  const getSelectedTrainerName = () => {
    if (filter.trainerId === 'all') return '전체 트레이너';
    const trainer = trainers.find(t => t.id === filter.trainerId);
    return trainer ? `${trainer.name} 트레이너` : '전체 트레이너';
  };

  return (
    <section className="py-4 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 🎯 컴팩트한 필터 UI */}
        <div className="flex items-center justify-between">
          {/* 필터 제목과 결과 카운트 */}

          {/* 드롭다운 필터들 */}
          <div className="flex items-center space-x-3">
            {/* 🎯 후기 종류 드롭다운 */}
            <div className="relative">
              <button
                onClick={() => setReviewTypeOpen(!reviewTypeOpen)}
                className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                {reviewTypeLabels[filter.reviewType]}
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {reviewTypeOpen && (
                <div className="absolute left-0 z-10 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    {[
                      { value: 'all', label: '전체' },
                      { value: 'general', label: '일반회원권' },
                      { value: 'pt', label: 'PT 수업' }
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleReviewTypeChange(option.value as ReviewFilterState['reviewType'])}
                        className={`block w-full text-left px-4 py-2 text-sm transition-colors duration-150 ${
                          filter.reviewType === option.value
                            ? 'bg-red-100 text-red-900 font-medium'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {option.label}
                        {filter.reviewType === option.value && (
                          <svg className="w-4 h-4 inline ml-2 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 🎯 트레이너 드롭다운 (PT 선택시에만 활성화) */}
            {filter.reviewType === 'pt' && (
              <div className="relative">
                <button
                  onClick={() => setTrainerOpen(!trainerOpen)}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  {getSelectedTrainerName()}
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {trainerOpen && (
                  <div className="absolute left-0 z-10 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      <button
                        onClick={() => handleTrainerChange('all')}
                        className={`block w-full text-left px-4 py-2 text-sm transition-colors duration-150 ${
                          filter.trainerId === 'all'
                            ? 'bg-red-100 text-red-900 font-medium'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        전체 트레이너
                        {filter.trainerId === 'all' && (
                          <svg className="w-4 h-4 inline ml-2 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </button>
                      {trainers.map((trainer) => (
                        <button
                          key={trainer.id}
                          onClick={() => handleTrainerChange(trainer.id)}
                          className={`block w-full text-left px-4 py-2 text-sm transition-colors duration-150 ${
                            filter.trainerId === trainer.id
                              ? 'bg-red-100 text-red-900 font-medium'
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          {trainer.name} 트레이너
                          {filter.trainerId === trainer.id && (
                            <svg className="w-4 h-4 inline ml-2 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 🎯 필터 초기화 버튼 */}
            {(filter.reviewType !== 'all' || filter.trainerId !== 'all') && (
              <button
                onClick={() => onFilterChange({ reviewType: 'all', trainerId: 'all' })}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                초기화
              </button>
            )}
          </div>
        </div>

        {/* 드롭다운이 열렸을 때 백그라운드 클릭으로 닫기 */}
        {(reviewTypeOpen || trainerOpen) && (
          <div 
            className="fixed inset-0 z-5" 
            onClick={() => {
              setReviewTypeOpen(false);
              setTrainerOpen(false);
            }}
          />
        )}
      </div>
    </section>
  );
};

export default ReviewFilter;
