import { notFound } from 'next/navigation';
import Link from 'next/link';
import Reviews from '@/components/Reviews';
import Services from '@/components/Services';
import Trainers from '@/components/Trainers';
import Facilities from '@/components/Facilities';
import Location from '@/components/Location';
import Contact from '@/components/Contact';
import { getTrainersByCenter, getReviewsByCenter, getCenterInfoByCenterId } from '@/lib/sanityData';
import { generateLocalBusinessStructuredData } from '@/lib/metadata';
import type { CenterId } from '@/constants/centers';

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

// 센터별 메인 페이지 props 타입 정의
interface CenterPageProps {
  params: Promise<{ center: string }>;
}

// 센터별 메인 페이지 컴포넌트
export default async function CenterPage({ params }: CenterPageProps) {
  const { center } = await params;
  
  // Sanity에서 센터 정보 가져오기
  const centerInfo = await getCenterInfoByCenterId(center);
  
  // 센터 정보가 없으면 404 페이지로 (유효하지 않은 센터 ID 또는 Sanity 오류)
  if (!centerInfo) {
    notFound();
  }
  
  // 센터가 준비중인 경우 준비중 페이지 표시
  if (centerInfo.status === 'preparing') {
    return (
      <div className="min-h-screen">
        <main className="pt-12 md:pt-16">
          {/* 준비중 안내 섹션 */}
          <section className="bg-gradient-to-br from-[var(--center-primary)] to-[var(--center-secondary)] text-white py-24 md:py-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div className="mb-8">
                <h1 className="text-5xl md:text-7xl font-bold mb-6">
                  {centerInfo.name}
                </h1>
                <div className="w-32 h-1 bg-white mx-auto rounded-full mb-8"></div>
              </div>
              
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">
                  🚧 준비중입니다
                </h2>
                <p className="text-xl text-white/90 mb-8 leading-relaxed">
                  {centerInfo.description}
                </p>
                <p className="text-lg text-white/80">
                  더욱 완벽한 서비스로 곧 만나뵙겠습니다
                </p>
              </div>
              
              {/* 다른 센터 안내 */}
              <div className="mt-12 pt-8 border-t border-white/20">
                <p className="text-white/80 mb-4">
                  다른 센터를 먼저 이용해보세요
                </p>
                <Link
                  href="/"
                  className="inline-block bg-white text-gray-900 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors duration-200"
                >
                  센터 선택하기
                </Link>
              </div>
            </div>
          </section>
        </main>
        
      </div>
    );
  }
  
  // Sanity에서 센터별 데이터 가져오기 (운영중인 센터만)
  const trainers = await getTrainersByCenter(centerInfo.centerId);
  const reviews = await getReviewsByCenter(centerInfo.centerId);
  
  // SEO 최적화를 위한 센터별 구조화된 데이터 생성
  const structuredData = generateLocalBusinessStructuredData(centerInfo.centerId as CenterId);
  
  return (
    <div className="min-h-screen">
      {/* 구조화된 데이터 (JSON-LD) - Google 검색 최적화를 위한 비즈니스 정보 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* 메인 콘텐츠 */}
      <main>
        {/* 히어로 섹션 - 센터별 브랜딩 색상 적용 */}
        <section className="pt-20 relative text-white h-[400px] md:h-[500px] flex items-center overflow-hidden">
          {/* 센터별 그라데이션 배경 */}
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--center-primary)] to-[var(--center-secondary)]"></div>
          
          {/* 기존 이미지 오버레이 (선택사항) */}
          <div className="absolute inset-0 bg-black/40"></div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              {centerInfo.name}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed">
              {centerInfo.description}
            </p>
            
            {/* 센터 정보 */}
            <div className="flex flex-col md:flex-row justify-center items-center gap-6 text-lg">
              <div className="flex items-center">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {centerInfo.contact.address}
              </div>
              
              <div className="flex items-center">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {centerInfo.contact.phone}
              </div>
            </div>
          </div>
        </section>

        {/* 고객 후기 섹션 - 자동 슬라이드 되는 리뷰들 */}
        <Reviews reviews={reviews} isMainPage={true} currentCenter={center} />

        {/* 제공 서비스 섹션 - Sanity 센터별 서비스 가격 정보 */}
        <Services centerInfo={centerInfo} />

        {/* 트레이너 섹션 - 4분할로 배치된 트레이너 정보 */}
        <Trainers trainers={trainers} currentCenter={center} />

        {/* 시설 정보 섹션 - 이미지 슬라이더와 설명 */}
        <Facilities />

        {/* 찾아오는 길 섹션 - Sanity 센터별 위치, 교통, 주차 정보 */}
        <Location centerInfo={centerInfo} />

        {/* 문의하기 섹션 - Sanity 센터별 연락처 정보 */}
        <Contact centerInfo={centerInfo} currentCenter={center} />
      </main>
    </div>
  );
}
