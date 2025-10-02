import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { generatePageMetadata, generateCenterMetadata } from '@/lib/metadata';
import { getCenterInfoByCenterId } from '@/lib/sanityData';
import { CENTER_COLORS } from '@/constants/colors';
import type { CenterId } from '@/constants/centers';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// 정적 파라미터 생성 함수 - output: export 설정 시 필요  
export async function generateStaticParams() {
  // Sanity에서 활성화된 센터 정보를 가져와서 static params 생성
  try {
    const { getActiveCenterInfo } = await import('@/lib/sanityData');
    const centers = await getActiveCenterInfo();
    return centers.map((center) => ({
      center: center.centerId,
    }));
  } catch (error) {
    console.error('센터 정보를 가져오는데 실패했습니다:', error);
    // 에러 발생 시 기본 센터들 반환 (fallback)
    return [
      { center: 'wangsimni' },
      { center: 'daechi' }, 
      { center: 'cheongdam' }
    ];
  }
}

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
  
  // Sanity에서 센터 정보 가져오기
  const centerInfo = await getCenterInfoByCenterId(center);
  
  // 센터 정보가 없으면 404 메타데이터
  if (!centerInfo) {
    return generatePageMetadata({
      title: '페이지를 찾을 수 없습니다',
      description: '요청하신 센터 페이지를 찾을 수 없습니다.',
    });
  }
  
  // 센터별 메타데이터 생성
  return generateCenterMetadata({
    centerId: centerInfo.centerId as CenterId,
    title: centerInfo.name,
    description: centerInfo.description,
    path: `/${center}`,
    keywords: centerInfo.seo.keywords,
  });
}

// 센터별 레이아웃 컴포넌트
export default async function CenterLayout({
  children,
  params,
}: CenterLayoutProps) {
  const { center } = await params;
  
  // Sanity에서 센터 정보 가져오기
  const centerInfo = await getCenterInfoByCenterId(center);
  
  // 센터 정보가 없으면 404 페이지로 (유효하지 않은 센터 ID 또는 Sanity 오류)
  if (!centerInfo) {
    notFound();
  }
  
  return (
    <div 
      className="min-h-screen"
      style={{
        // 센터별 CSS 커스텀 프로퍼티 설정 - Tailwind arbitrary values에서 사용
        '--center-primary': CENTER_COLORS[centerInfo.centerId as keyof typeof CENTER_COLORS]?.primaryHex || CENTER_COLORS.wangsimni.primaryHex,
        '--center-secondary': '#f3f4f6', // 기본 보조 컬러 (gray-100)
      } as React.CSSProperties}
    >
      {/* 센터별 헤더 - Sanity 데이터 전달 */}
      <Header currentCenter={center} centerInfo={centerInfo} />
      
      {/* 센터별 페이지 콘텐츠 렌더링 */}
      <main>
        {children}
      </main>
      
      {/* 센터별 푸터 - Sanity 데이터 전달 */}
      <Footer currentCenter={center} centerInfo={centerInfo} />
    </div>
  );
}
