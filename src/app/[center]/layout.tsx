import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { isValidCenterId, getCenterById } from '@/constants/centers';
import { generatePageMetadata } from '@/lib/metadata';

// 센터별 레이아웃 props 타입 정의
interface CenterLayoutProps {
  children: React.ReactNode;
  params: Promise<{ center: string }>;
}

// 센터별 메타데이터 생성 함수
export async function generateMetadata({
  params,
}: {
  params: Promise<{ center: string }>;
}): Promise<Metadata> {
  const { center } = await params;
  
  // 센터 ID 유효성 검사
  if (!isValidCenterId(center)) {
    return generatePageMetadata({
      title: '페이지를 찾을 수 없습니다',
      description: '요청하신 센터 페이지를 찾을 수 없습니다.',
    });
  }
  
  // 센터 정보 가져오기
  const centerInfo = getCenterById(center);
  
  // 센터별 메타데이터 생성
  return generatePageMetadata({
    title: centerInfo.name,
    description: centerInfo.description,
    path: `/${center}`,
    keywords: centerInfo.keywords,
  });
}

// 센터별 레이아웃 컴포넌트
export default async function CenterLayout({
  children,
  params,
}: CenterLayoutProps) {
  const { center } = await params;
  
  // 센터 ID 유효성 검사 - 잘못된 ID면 404 페이지로
  if (!isValidCenterId(center)) {
    notFound();
  }
  
  // 센터 정보 가져오기
  const centerInfo = getCenterById(center);
  
  return (
    <div 
      className="min-h-screen"
      style={{
        // 센터별 CSS 커스텀 프로퍼티 설정 - Tailwind arbitrary values에서 사용
        '--center-primary': centerInfo.branding.primary,
        '--center-secondary': centerInfo.branding.secondary,
      } as React.CSSProperties}
    >
      {/* 센터별 페이지 콘텐츠 렌더링 */}
      {children}
    </div>
  );
}
