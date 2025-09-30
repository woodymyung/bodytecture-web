// 루트 레벨 404 페이지 - 스마트 리다이렉트 (센터별 또는 루트)
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { isValidCenterId, getCenterById, type CenterInfo } from '@/constants/centers';

export default function NotFound() {
  const router = useRouter();
  const [pathInfo, setPathInfo] = useState<{
    isCenter: boolean;
    center: string | null;
    centerInfo: CenterInfo | null;
  }>({ isCenter: false, center: null, centerInfo: null });

  // 클라이언트에서만 경로 분석 (Hydration mismatch 방지)
  useEffect(() => {
    const currentPath = window.location.pathname;
    const pathSegments = currentPath.split('/').filter(Boolean);
    
    if (pathSegments.length > 0 && isValidCenterId(pathSegments[0])) {
      // 센터별 경로
      setPathInfo({
        isCenter: true,
        center: pathSegments[0],
        centerInfo: getCenterById(pathSegments[0])
      });
    } else {
      // 루트 경로
      setPathInfo({
        isCenter: false,
        center: null,
        centerInfo: null
      });
    }
  }, []);

  // 3초 후 자동 리다이렉트
  useEffect(() => {
    const timer = setTimeout(() => {
      if (pathInfo.isCenter && pathInfo.center) {
        // 센터별 경로 → 해당 센터 메인으로 리다이렉트
        router.push(`/${pathInfo.center}`);
      } else {
        // 루트 경로 → 센터 선택 페이지로 리다이렉트
        router.push('/');
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [router, pathInfo]);

  // 센터별 또는 루트 UI 렌더링
  if (pathInfo.isCenter && pathInfo.centerInfo) {
    // 센터별 404 페이지 (센터 브랜딩 적용)
    return (
      <div 
        className="min-h-screen flex items-center justify-center"
        style={{
          '--center-primary': pathInfo.centerInfo.branding.primary,
          '--center-secondary': pathInfo.centerInfo.branding.secondary,
        } as React.CSSProperties}
      >
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* 센터별 브랜딩 배경 */}
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--center-primary)]/5 to-[var(--center-secondary)]/5"></div>
          
          <div className="relative z-10">
            {/* 센터 로고/이름 */}
            <div className="mb-8">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                <span style={{ color: pathInfo.centerInfo.branding.primary }}>
                  {pathInfo.centerInfo.shortName}
                </span>
              </h1>
              <div 
                className="w-24 h-1 mx-auto rounded-full"
                style={{ backgroundColor: pathInfo.centerInfo.branding.primary }}
              ></div>
            </div>

            {/* 404 메시지 */}
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                페이지를 찾을 수 없습니다
              </h2>
              <p className="text-xl text-gray-600 mb-6">
                {pathInfo.centerInfo.name}에서 요청하신 페이지가 존재하지 않거나 이동되었습니다
              </p>
              <p className="text-lg text-gray-500">
                3초 뒤 홈으로 이동합니다
              </p>
            </div>

            {/* 액션 버튼 */}
            <div className="flex justify-center">
              <Link
                href={`/${pathInfo.center}`}
                className="text-white px-8 py-3 rounded-full font-bold hover:opacity-90 transition-all duration-200"
                style={{ backgroundColor: pathInfo.centerInfo.branding.primary }}
              >
                홈으로 가기
              </Link>
            </div>

            {/* 카운트다운 표시 */}
            <div className="mt-8 text-gray-400">
              <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              자동 리다이렉트 중...
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 루트 404 페이지 (기본 브랜딩)
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* 로고 */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            BODY<span className="text-red-600">TECTURE</span>
          </h1>
          <div className="w-24 h-1 bg-red-600 mx-auto rounded-full"></div>
        </div>

        {/* 404 메시지 */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            페이지를 찾을 수 없습니다
          </h2>
          <p className="text-xl text-gray-600 mb-6">
            요청하신 페이지가 존재하지 않거나 이동되었습니다
          </p>
          <p className="text-lg text-gray-500">
            3초 뒤 홈으로 이동합니다
          </p>
        </div>

        {/* 액션 버튼 */}
        <div className="flex justify-center">
          <Link
            href="/"
            className="bg-red-600 text-white px-8 py-3 rounded-full font-bold hover:bg-red-700 transition-colors duration-200"
          >
            홈으로 가기
          </Link>
        </div>

        {/* 카운트다운 표시 */}
        <div className="mt-8 text-gray-400">
          <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          자동 리다이렉트 중...
        </div>
      </div>
    </div>
  );
}
