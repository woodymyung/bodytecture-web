import React from 'react';
import { CenterInfo } from '@/types';
import { CONTACT_INFO, COMPANY_INFO } from '@/constants/contact';

// 문의하기 컴포넌트 props 타입 정의
interface ContactProps {
  centerInfo?: CenterInfo; // 센터 정보 (Sanity에서 가져온 데이터)
}

// 문의하기 컴포넌트 - 전화번호 중심의 간단한 연락처 정보
const Contact: React.FC<ContactProps> = ({ centerInfo }) => {
  // 센터별 정보 가져오기 - Sanity 데이터 우선, 없으면 하드코딩된 데이터 사용 (fallback)
  // 안전한 접근 처리: 빈 문자열이나 undefined 체크
  const centerName = (centerInfo?.name && centerInfo.name.trim()) 
    ? centerInfo.name 
    : COMPANY_INFO.shortName;
  const contactPhone = (centerInfo?.contact?.phone && centerInfo.contact.phone.trim()) 
    ? centerInfo.contact.phone 
    : CONTACT_INFO.phone;

  return (
    <section id="contact" className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-6 pb-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            문의하기
          </h2>
          <p className="text-lg text-gray-600">
            {centerName}에 대해 궁금하신 점이 있으시면 언제든 문자/전화로 연락주세요
          </p>
        </div>


        {/* 전화번호 중심 연락처 */}
        <div className="bg-white text-center">

          <p className="text-4xl font-bold text-black mb-6">
            {contactPhone}
          </p>
          {/* 문의하기 버튼 */}
          <a
            href={`tel:${contactPhone}`}
            className="rounded-full inline-flex items-center px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            전화하기
          </a>

        </div>
      </div>
    </section>
  );
};

export default Contact;
