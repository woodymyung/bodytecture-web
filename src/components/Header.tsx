'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CONTACT_INFO } from '@/constants/contact';

// 헤더 컴포넌트 - 바디텍쳐 로고와 네비게이션 메뉴를 포함
const Header: React.FC = () => {
  // 모바일 메뉴 상태 관리
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 네비게이션 메뉴 아이템들 - 시설은 메인 페이지의 facilities 섹션으로 이동
  const menuItems = [
    { label: '오시는 길', href: '/#location' },
    { label: '제공 서비스', href: '/#services' },
    { label: '트레이너', href: '/trainers' },
    { label: '시설', href: '/#facilities' }, // 메인 페이지의 facilities 섹션으로 변경
    // { label: '블로그', href: '/posts' },
    { label: '후기', href: '/reviews' },
    { label: '문의하기', href: `tel:${CONTACT_INFO.phone}` }, // 클릭 시 바로 전화 연결
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-red-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12 md:h-16">
          {/* 로고 섹션 */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/bodytecture-logo-white.svg"
                alt="바디텍쳐 왕십리 청계점"
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
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-red-200 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-300"
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

      {/* 모바일 메뉴 */}
      <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-red-600 border-t border-red-500">
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
