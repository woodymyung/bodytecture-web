'use client';

import React, { useState } from 'react';

const NewsletterForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    
    // 실제로는 API 호출
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    alert('뉴스레터 구독이 완료되었습니다!');
    setEmail('');
    setIsSubmitting(false);
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            건강 정보 뉴스레터
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            바디텍쳐의 건강과 운동 관련 최신 소식을
            이메일로 받아보세요
          </p>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일 주소를 입력하세요"
              required
              disabled={isSubmitting}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? '처리 중...' : '구독하기'}
            </button>
          </form>

          <p className="text-sm text-gray-500 mt-4">
            언제든지 구독을 취소하실 수 있습니다.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterForm;
