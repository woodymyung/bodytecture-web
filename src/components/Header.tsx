'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CONTACT_INFO } from '@/constants/contact';
import { CenterInfo } from '@/types';
import { getCenterColorClasses } from '@/constants/colors';

// 헤더 컴포넌트 props 타입 정의
interface HeaderProps {
  currentCenter?: string; // 현재 센터 ID (센터별 페이지에서 전달)
  centerInfo?: CenterInfo; // 센터 정보 (Sanity에서 가져온 데이터)
}

// 헤더 컴포넌트 - 바디텍쳐 로고와 네비게이션 메뉴를 포함
const Header: React.FC<HeaderProps> = ({ currentCenter, centerInfo }) => {
  // 모바일 메뉴 상태 관리
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 센터별 정보 가져오기 - Sanity 데이터 우선, 없으면 기본값 사용
  const phoneNumber = centerInfo?.contact?.phone || CONTACT_INFO.phone;
  const centerName = centerInfo?.name || '바디텍쳐';
  // 센터별 브랜딩 로고 - Sanity branding logo 우선, 없으면 기본 로고 사용
  const logoUrl = centerInfo?.branding?.logo || '/images/bodytecture-logo-white.svg';
  // 센터별 브랜딩 컬러 클래스 - Tailwind 방식 사용
  const colorClasses = getCenterColorClasses(currentCenter || 'wangsimni');

  // 센터별 동적 네비게이션 메뉴 생성
  const getMenuItems = (centerId?: string) => {
    const centerPrefix = centerId ? `/${centerId}` : '';
    const locationHref = centerId ? `${centerPrefix}#location` : '/#location';
    const servicesHref = centerId ? `${centerPrefix}#services` : '/#services';
    const facilitiesHref = centerId ? `${centerPrefix}#facilities` : '/#facilities';
    
    return [
      { label: '오시는 길', href: locationHref },
      { label: '제공 서비스', href: servicesHref },
      { label: '트레이너', href: `${centerPrefix}/trainers` },
      { label: '시설', href: facilitiesHref },
      // { label: '블로그', href: `${centerPrefix}/posts` },
      { label: '후기', href: `${centerPrefix}/reviews` },
      { label: '문의하기', href: `tel:${phoneNumber}` }, // 센터별 전화번호 사용
    ];
  };

  // 현재 센터에 맞는 메뉴 아이템들 생성
  const menuItems = getMenuItems(currentCenter);

  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 bg-[var(--center-primary)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12 md:h-16">
          {/* 로고 섹션 */}
          <div className="flex-shrink-0">
            <Link href={currentCenter ? `/${currentCenter}` : "/"} className="flex items-center">
              <Image
                src={logoUrl}
                alt={centerName}
                width={200}
                height={40}
                className="h-7 md:h-9 w-auto"
                priority
              />
            </Link>
          </div>

          {/* 데스크탑 메뉴 */}
          <nav className="hidden md:flex space-x-0">
            {menuItems.map((item) => (
              item.href.startsWith('/#') ? (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-white hover:bg-white/10 px-3 py-2 rounded-full text-sm font-bold duration-100"
                  scroll={true}
                >
                  {item.label}
                </Link>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-white hover:bg-white/10 px-3 py-2 rounded-full text-sm font-bold duration-100"
                >
                  {item.label}
                </Link>
              )
            ))}
          </nav>

          {/* 모바일 메뉴 버튼 */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white/80 hover:${colorClasses.bgAccent} focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white/30`}
              aria-expanded="false"
            >
              <span className="sr-only">메뉴 열기</span>
              {/* 햄버거 아이콘 */}
              <svg
                className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* 닫기 아이콘 */}
              <svg
                className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* 모바일 메뉴 - 센터별 동적 배경색 적용 */}
      <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className={`px-2 pt-2 pb-3 space-y-1 sm:px-3 ${colorClasses.bgPrimary} border-t border-white/20`}>
          {menuItems.map((item) => (
            item.href.startsWith('/#') ? (
              <Link
                key={item.label}
                href={item.href}
                className="text-white hover:text-red-200 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
                scroll={true}
              >
                {item.label}
              </Link>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className="text-white hover:text-red-200 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            )
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
