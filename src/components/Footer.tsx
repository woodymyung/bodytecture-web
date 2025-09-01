import React from 'react';

// 푸터 컴포넌트
const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* 회사 정보 */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">바디텍쳐 왕십리 청계점</h3>
            <p className="text-gray-300 mb-4 leading-relaxed">
              정원제로 운영되어 쾌적한 서비스를 제공하는 프리미엄 헬스장입니다.
              전문 트레이너와 함께 건강한 라이프스타일을 만들어가세요.
            </p>
            <div className="space-y-2 text-sm text-gray-300">
              <p>📍 서울특별시 성동구 왕십리로 315</p>
              <p>📞 02-123-4567</p>
              <p>🕒 06:00 - 24:00 (연중무휴)</p>
            </div>
          </div>

          {/* 빠른 링크 */}
          <div>
            <h4 className="text-lg font-semibold mb-4">빠른 링크</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#services" className="hover:text-white transition-colors duration-200">제공 서비스</a></li>
              <li><a href="#trainers" className="hover:text-white transition-colors duration-200">트레이너 소개</a></li>
              <li><a href="#facilities" className="hover:text-white transition-colors duration-200">시설 안내</a></li>
              <li><a href="#posts" className="hover:text-white transition-colors duration-200">바디텍쳐 포스트</a></li>
            </ul>
          </div>

          {/* 고객 지원 */}
          <div>
            <h4 className="text-lg font-semibold mb-4">고객 지원</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#contact" className="hover:text-white transition-colors duration-200">문의하기</a></li>
              <li><a href="#location" className="hover:text-white transition-colors duration-200">찾아오는 길</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">이용 안내</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">자주 묻는 질문</a></li>
            </ul>
          </div>
        </div>

        {/* 구분선 */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 바디텍쳐 왕십리 청계점. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors duration-200">개인정보처리방침</a>
              <a href="#" className="hover:text-white transition-colors duration-200">이용약관</a>
              <a href="#" className="hover:text-white transition-colors duration-200">환불규정</a>
            </div>
          </div>
        </div>

        {/* SNS 링크 */}
        <div className="mt-8 pt-8 border-t border-gray-700">
          <div className="flex justify-center space-x-6">
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors duration-200"
              aria-label="인스타그램"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors duration-200"
              aria-label="페이스북"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors duration-200"
              aria-label="네이버 블로그"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM8.5 9h2.5c.55 0 1 .45 1 1s-.45 1-1 1H9v1.5c0 .28-.22.5-.5.5s-.5-.22-.5-.5V9c0-.55.45-1 1-1zm7 0h-2.5c-.55 0-1 .45-1 1v3c0 .55.45 1 1 1h1.5c.55 0 1-.45 1-1s-.45-1-1-1H14V9.5c0-.28.22-.5.5-.5s.5.22.5.5V9z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
