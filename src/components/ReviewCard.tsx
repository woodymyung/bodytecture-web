import React from 'react';
import Link from 'next/link';
import { Review, SanityRichTextBlock } from '@/types';

interface ReviewCardProps {
  review: Review;
  isMainPage?: boolean; // 메인 페이지에서 사용 시 모바일에서 텍스트 제한 적용
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review, isMainPage = false }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'short', // 더 간결한 월 표시 (3월 → 3월)
      day: 'numeric'
    });
  };

  // Rich Text 블록을 일반 텍스트로 변환하는 함수
  const convertRichTextToPlainText = (blocks: SanityRichTextBlock[]): string => {
    if (!blocks || !Array.isArray(blocks)) return '';
    
    return blocks
      .map(block => {
        if (block._type === 'block' && block.children) {
          return block.children
            .map(child => child.text || '')
            .join('');
        }
        return '';
      })
      .join(' '); // 블록 사이에 공백 추가
  };

  return (
    <Link href="/reviews" className="block">
      <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 text-center cursor-pointer transform hover:scale-[1.02]">
      {/* 🎯 중앙 정렬 레이아웃 */}
      
      {/* 1️⃣ 작성자 (아바타 + 이름) */}
      <div className="flex flex-col items-center mb-1">
        {/* <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center mb-3 shadow-lg">
          <span className="text-white font-bold text-lg">
            {review.author.charAt(0)}
          </span>
        </div> */}
        <h4 className="font-bold text-gray-900 text-lg">{review.author}</h4>
      </div>

      {/* 2️⃣ 작성 일자 / Source */}
      <div className="mb-1">
        <p className="text-sm text-gray-600 flex items-center justify-center space-x-2">
          <span>{formatDate(review.date)} ∙ {review.source}</span>
        </p>
      </div>

      {/* 3️⃣ 별점 (중앙 정렬) */}
      <div className="flex items-center justify-center mb-4">
        <div className="flex items-center space-x-1">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`w-6 h-6 transition-colors ${
                i < review.rating ? 'text-yellow-400' : 'text-gray-300'
              }`}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          ))}
        </div>
      </div>

      {/* 4️⃣ 작성 내용 (중앙 정렬) */}
      <div className="border-t border-gray-100 pt-6 pb-2">
        {/* 인용문 기호와 텍스트를 분리하여 높이 제한 정확하게 적용 */}
        <div className="relative px-2">
          <span className="text-4xl text-red-200 absolute -top-2 -left-1 font-serif z-10">&ldquo;</span>
          <span className="text-4xl text-red-200 absolute -bottom-2 -right-1 font-serif z-10">&rdquo;</span>
          
          {/* 텍스트 영역만 높이 제한 */}
          <div className={`relative z-20 px-4 ${
            isMainPage ? 'lg:line-clamp-none line-clamp-4 lg:max-h-none overflow-hidden' : '' 
          }`}>
            <blockquote className="text-gray-700 leading-relaxed text-base italic">
              {convertRichTextToPlainText(review.reviewContent)}
            </blockquote>
          </div>
        </div>
      </div>

      </div>
    </Link>
  );
};

export default ReviewCard;
