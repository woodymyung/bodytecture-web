import React from 'react';
import { CONTACT_INFO, COMPANY_INFO, SOCIAL_LINKS } from '@/constants/contact';

// 푸터 컴포넌트
const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* 회사 정보 */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">{COMPANY_INFO.name}</h3>
            <p className="text-gray-300 mb-4 leading-relaxed">
              {COMPANY_INFO.description}
            </p>
            <div className="space-y-2 text-sm text-gray-300">
              <p>📍 {CONTACT_INFO.address}</p>
              <p>📞 {CONTACT_INFO.phone}</p>
              <p>🕒 평일: {CONTACT_INFO.businessHours.weekdays.display}</p>
              <p>🕒 주말: {CONTACT_INFO.businessHours.weekends.display}</p>
            </div>
          </div>

          {/* 서비스 정보 */}
          <div>
            <h4 className="text-lg font-semibold mb-4">서비스 정보</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/#services" className="hover:text-white transition-colors duration-200">제공 서비스</a></li>
              <li><a href="/trainers" className="hover:text-white transition-colors duration-200">트레이너 소개</a></li>
              <li><a href="/#facilities" className="hover:text-white transition-colors duration-200">시설 안내</a></li>
            </ul>
          </div>

          {/* 고객 지원 */}
          <div>
            <h4 className="text-lg font-semibold mb-4">고객 지원</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href={`tel:${CONTACT_INFO.phone}`} className="hover:text-white transition-colors duration-200">문의하기</a></li>
              <li><a href="/#location" className="hover:text-white transition-colors duration-200">찾아오는 길</a></li>
            </ul>
          </div>
        </div>

        {/* 구분선 */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © {COMPANY_INFO.established} {COMPANY_INFO.name}. All rights reserved.
            </div>
          </div>
        </div>

        {/* SNS 링크 */}
        <div className="mt-8 pt-8 border-t border-gray-700">
          <div className="flex justify-center space-x-6">
            {/* 인스타그램 */}
            <a
              href={SOCIAL_LINKS.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-pink-400 transition-colors duration-200"
              aria-label={SOCIAL_LINKS.instagram.name}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.40z"/>
              </svg>
            </a>
            
            {/* 네이버 플레이스 */}
            <a
              href={SOCIAL_LINKS.naver.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-green-400 transition-colors duration-200"
              aria-label={SOCIAL_LINKS.naver.name}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16.273 12.845 7.376 0H0v24h7.727V11.155L16.624 24H24V0h-7.727v12.845Z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
