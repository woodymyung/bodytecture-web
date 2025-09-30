import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Trainers from '@/components/Trainers';
import { getTrainersByCenter } from '@/lib/sanityData';
import { generatePageMetadata, generateCenterMetadata } from '@/lib/metadata';
import { isValidCenterId, getCenterById, getAllCenters } from '@/constants/centers';

// 센터별 트레이너 페이지 props 타입 정의
interface TrainersPageProps {
  params: Promise<{ center: string }>;
}

// 정적 파라미터 생성 함수 - output: export 설정 시 필요
export function generateStaticParams() {
  const centers = getAllCenters();
  return centers.map((center) => ({
    center: center.id,
  }));
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
      description: '요청하신 트레이너 페이지를 찾을 수 없습니다.',
    });
  }
  
  // 센터 정보 가져오기
  const centerInfo = getCenterById(center);
  
  // 센터별 메타데이터 생성
  return generateCenterMetadata({
    centerId: center,
    title: `전문 트레이너`,
    description: `${centerInfo.name}의 전문 트레이너들을 소개합니다. 경험이 풍부한 트레이너들이 회원님의 건강한 변화를 위해 최선을 다하겠습니다.`,
    path: `/${center}/trainers`,
    keywords: ['전문트레이너', '피트니스트레이너', 'PT', '개인트레이닝', '헬스트레이너'],
  });
}

// 센터별 트레이너 페이지 컴포넌트
export default async function TrainersPage({ params }: TrainersPageProps) {
  const { center } = await params;
  
  // 센터 ID 유효성 검사 - 잘못된 ID면 404 페이지로
  if (!isValidCenterId(center)) {
    notFound();
  }
  
  // 센터 정보 가져오기
  const centerInfo = getCenterById(center);
  
  // 센터가 준비중인 경우 메인 페이지로 리다이렉트 처리 (또는 준비중 메시지)
  if (centerInfo.status === 'preparing') {
    return (
      <div className="min-h-screen">
        <Header currentCenter={center} />
        
        <main className="pt-12 md:pt-16">
          {/* 준비중 안내 */}
          <section className="bg-gradient-to-br from-[var(--center-primary)] to-[var(--center-secondary)] text-white py-24 md:py-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                트레이너 소개
              </h1>
              <p className="text-xl text-white/90 mb-8">
                {centerInfo.name}의 트레이너 정보를 준비 중입니다
              </p>
              <p className="text-lg text-white/80">
                곧 전문 트레이너들과 함께 만나뵙겠습니다
              </p>
            </div>
          </section>
        </main>
        
        <Footer currentCenter={center} />
      </div>
    );
  }
  
  // Sanity에서 센터별 트레이너 데이터 가져오기
  const trainers = await getTrainersByCenter(center);
  
  return (
    <div className="min-h-screen">
      <Header currentCenter={center} />

      <main className="pt-12 md:pt-16">
        {/* 페이지 헤더 - 센터별 브랜딩 색상 적용 */}
        <section className="bg-gradient-to-br from-[var(--center-primary)] to-[var(--center-secondary)] text-white py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              전문 트레이너
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              {centerInfo.name}의 전문 트레이너들을 소개합니다
            </p>
          </div>
        </section>

        {/* 메인 페이지의 트레이너 섹션 재활용 - 헤더 숨김 */}
        <Trainers trainers={trainers} hideHeader={true} currentCenter={center} />
      </main>

      <Footer currentCenter={center} />
    </div>
  );
}
