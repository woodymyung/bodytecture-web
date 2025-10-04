import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Trainers from '@/components/Trainers';
import { getTrainersByCenter, getCenterInfoByCenterId, getActiveCenterInfo, getCenterPageSEO } from '@/lib/sanityData';
import { urlFor } from '@/lib/sanity';
import { generateCenterMetadata } from '@/lib/metadata';
import type { CenterId } from '@/constants/centers';

// 센터별 트레이너 페이지 props 타입 정의
interface TrainersPageProps {
  params: Promise<{ center: string }>;
}

// 정적 파라미터 생성 함수 - output: export 설정 시 필요
export async function generateStaticParams() {
  try {
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
    return {
      title: '페이지를 찾을 수 없습니다',
      description: '요청하신 트레이너 페이지를 찾을 수 없습니다.',
      robots: {
        index: false,
        follow: false,
      },
    };
  }
  
  // Sanity SEO Settings에서 트레이너 페이지 SEO 데이터 가져오기
  const trainersSEO = await getCenterPageSEO(centerInfo.centerId, 'trainersPage');
  const centerMainSEO = await getCenterPageSEO(centerInfo.centerId, 'mainPage');
  
  // Sanity 데이터가 있으면 사용, 없으면 fallback 데이터 사용
  const title = trainersSEO?.metaTitle || `전문 트레이너`;
  const description = trainersSEO?.metaDescription || `${centerInfo.name}의 전문 트레이너들을 소개합니다. 경험이 풍부한 트레이너들이 회원님의 건강한 변화를 위해 최선을 다하겠습니다.`;
  
  // 키워드 합치기: 센터 메인 키워드 + 트레이너 페이지 키워드 (중복 제거)
  const centerKeywords = centerMainSEO?.keywords || [];
  const trainersKeywords = trainersSEO?.keywords || ['전문트레이너', '피트니스트레이너', 'PT', '개인트레이닝', '헬스트레이너'];
  const keywords = [...new Set([...centerKeywords, ...trainersKeywords])];
  
  // 센터 메인 페이지의 OG 이미지 상속받기
  let ogImages = undefined;
  if (centerMainSEO?.ogImage?.asset) {
    try {
      const centerOGImageUrl = urlFor(centerMainSEO.ogImage)
        .width(1200)
        .height(630)
        .quality(90)
        .format('webp')
        .fit('crop')
        .url();
        
      ogImages = [{
        url: centerOGImageUrl,
        width: 1200,
        height: 630,
        alt: title
      }];
    } catch (error) {
      console.warn('센터 OG 이미지 변환 실패:', error);
    }
  }
  
  // 센터별 메타데이터 생성 (Sanity SEO Settings 데이터 + 센터 OG 이미지 상속)
  return generateCenterMetadata({
    centerId: centerInfo.centerId as CenterId,
    title,
    description,
    path: `/${center}/trainers`,
    keywords,
    images: ogImages,
  });
}

// 센터별 트레이너 페이지 컴포넌트
export default async function TrainersPage({ params }: TrainersPageProps) {
  const { center } = await params;
  
  // Sanity에서 센터 정보 가져오기
  const centerInfo = await getCenterInfoByCenterId(center);
  
  // 센터 정보가 없으면 404 페이지로 (유효하지 않은 센터 ID 또는 Sanity 오류)
  if (!centerInfo) {
    notFound();
  }
  
  // 센터가 준비중인 경우 메인 페이지로 리다이렉트 처리 (또는 준비중 메시지)
  if (centerInfo.status === 'preparing') {
    return (
      <div className="min-h-screen">
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
      </div>
    );
  }
  
  // Sanity에서 센터별 트레이너 데이터 가져오기
  const trainers = await getTrainersByCenter(centerInfo.centerId);
  
  return (
    <div className="min-h-screen">
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
    </div>
  );
}
