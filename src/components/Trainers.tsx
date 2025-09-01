import React from 'react';
import { trainers } from '@/data/mockData';
import { Trainer } from '@/types';

// 트레이너 정보 컴포넌트 - 4분할 그리드 레이아웃
const Trainers: React.FC = () => {
  return (
    <section id="trainers" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            전문 트레이너
          </h2>
          <p className="text-lg text-gray-600">
            바디텍쳐의 전문 트레이너들을 소개합니다
          </p>
        </div>

        {/* 4분할 그리드 레이아웃 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trainers.map((trainer: Trainer) => (
            <div
              key={trainer.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* 트레이너 이미지 */}
              <div className="aspect-square bg-gray-200 flex items-center justify-center">
                <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                  <span className="text-4xl font-bold text-blue-600">
                    {trainer.name.charAt(0)}
                  </span>
                </div>
              </div>

              {/* 트레이너 정보 */}
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {trainer.name}
                </h3>
                <p className="text-gray-600">
                  {trainer.description || '전문 트레이너'}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 트레이너 특징 설명 */}
        <div className="mt-12 text-center">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">전문 자격증 보유</h3>
              <p className="text-gray-600 text-sm">모든 트레이너가 전문 자격증을 보유하고 있습니다</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">친절한 서비스</h3>
              <p className="text-gray-600 text-sm">회원님 한분 한분께 최선을 다하는 친절한 서비스</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">맞춤 프로그램</h3>
              <p className="text-gray-600 text-sm">개인의 목표와 체력에 맞는 최적의 운동 프로그램</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Trainers;
