import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { isValidCenterId, getCenterById } from '@/constants/centers';
import { generatePageMetadata, generateCenterMetadata } from '@/lib/metadata';
import { getCenterInfoByCenterId } from '@/lib/sanityData';
import { CenterInfo } from '@/types';
import { CENTER_COLORS } from '@/constants/colors';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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
  return generateCenterMetadata({
    centerId: center,
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
  
  // Sanity에서 센터 정보 가져오기 - 실제 센터별 데이터 사용
  const centerInfo = await getCenterInfoByCenterId(center);
  
  // Sanity 데이터가 없으면 기본 정보를 사용 (후방 호환성)
  const fallbackInfo = getCenterById(center);
  const finalCenterInfo = centerInfo || {
    id: fallbackInfo.id,
    centerId: fallbackInfo.id,
    name: fallbackInfo.name,
    description: fallbackInfo.description,
    status: fallbackInfo.status,
    contact: {
      phone: fallbackInfo.contact.phone,
      address: fallbackInfo.contact.address,
      fullAddress: fallbackInfo.contact.fullAddress
    },
    businessHours: fallbackInfo.businessHours,
    branding: { logo: undefined, heroImage: undefined }, // 브랜딩은 로컬 컬러 상수에서 관리
    directions: { subway: [], bus: [], car: { address: '', parking: '' } },
    socialMedia: {},
    services: [],
    seo: { keywords: fallbackInfo.keywords, metaTitle: '', metaDescription: '' }
  } satisfies CenterInfo;
  
  return (
    <div 
      className="min-h-screen"
      style={{
        // 센터별 CSS 커스텀 프로퍼티 설정 - Tailwind arbitrary values에서 사용
        '--center-primary': CENTER_COLORS[center as keyof typeof CENTER_COLORS]?.primaryHex || CENTER_COLORS.wangsimni.primaryHex,
        '--center-secondary': '#f3f4f6', // 기본 보조 컬러 (gray-100)
      } as React.CSSProperties}
    >
      {/* 센터별 헤더 - Sanity 데이터 전달 */}
      <Header currentCenter={center} centerInfo={finalCenterInfo} />
      
      {/* 센터별 페이지 콘텐츠 렌더링 */}
      <main>
        {children}
      </main>
      
      {/* 센터별 푸터 - Sanity 데이터 전달 */}
      <Footer currentCenter={center} centerInfo={finalCenterInfo} />
    </div>
  );
}
