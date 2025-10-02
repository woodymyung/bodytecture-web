import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import ReviewsPageContent from '@/components/ReviewsPageContent';
import { getTrainersByCenter } from '@/lib/sanityData';
import { client } from '@/lib/sanity';
import { generatePageMetadata, generateCenterMetadata } from '@/lib/metadata';
import { isValidCenterId, getCenterById, getAllCenters } from '@/constants/centers';
import { SanityReviewRaw } from '@/types';

// 센터별 리뷰 페이지 props 타입 정의
interface ReviewsPageProps {
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
      description: '요청하신 후기 페이지를 찾을 수 없습니다.',
    });
  }
  
  // 센터 정보 가져오기
  const centerInfo = getCenterById(center);
  
  // 센터별 메타데이터 생성
  return generateCenterMetadata({
    centerId: center,
    title: '고객 후기',
    description: `${centerInfo.name}을 이용하신 회원님들의 생생한 후기를 만나보세요. 실제 경험담과 변화 스토리를 통해 차별화된 서비스를 확인하실 수 있습니다.`,
    path: `/${center}/reviews`,
    keywords: ['고객후기', '헬스장후기', 'PT후기', '회원리뷰', '운동후기', '피트니스후기'],
  });
}

// 센터별 리뷰 페이지 컴포넌트
export default async function ReviewsPage({ params }: ReviewsPageProps) {
  const { center } = await params;
  
  // 센터 ID 유효성 검사 - 잘못된 ID면 404 페이지로
  if (!isValidCenterId(center)) {
    notFound();
  }
  
  // 센터 정보 가져오기
  const centerInfo = getCenterById(center);
  
  // 센터가 준비중인 경우 준비중 메시지
  if (centerInfo.status === 'preparing') {
    return (
      <div className="min-h-screen">
        <main className="pt-12 md:pt-16">
          {/* 준비중 안내 */}
          <section className="bg-gradient-to-br from-[var(--center-primary)] to-[var(--center-secondary)] text-white py-24 md:py-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                고객 후기
              </h1>
              <p className="text-xl text-white/90 mb-8">
                {centerInfo.name}의 고객 후기를 준비 중입니다
              </p>
              <p className="text-lg text-white/80">
                곧 회원님들의 생생한 후기와 함께 만나뵙겠습니다
              </p>
            </div>
          </section>
        </main>
      </div>
    );
  }

  try {
    // 🎯 병렬로 센터별 데이터 로딩 (센터별 리뷰 + 트레이너)
    const [allReviews, trainers] = await Promise.all([
      // 센터별 리뷰 (최신순)
      client.fetch(`*[_type == "review" && isPublished == true && center == $center] | order(createdAt desc) {
        _id,
        author,
        reviewContent,
        rating,
        source,
        createdAt,
        center,
        trainer->{
          _id,
          name,
          slug,
          center
        }
      }`, { center }),
      // 센터별 트레이너 목록
      getTrainersByCenter(center)
    ]);

    // 리뷰 데이터 변환 - Sanity 데이터를 클라이언트 형식으로 변환
    const transformedReviews = allReviews.map((review: SanityReviewRaw) => ({
      id: review._id,
      author: review.author,
      reviewContent: review.reviewContent,
      rating: review.rating,
      date: review.createdAt,
      source: review.source,
      trainer: review.trainer
    }));

    return (
      <div className="min-h-screen">
        <main className="pt-12 md:pt-16">
          {/* 페이지 헤더 - 센터별 브랜딩 색상 적용 */}
          <section className="bg-gradient-to-br from-[var(--center-primary)] to-[var(--center-secondary)] text-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                고객 후기
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                {centerInfo.name}를 이용하신 회원님들의 생생한 후기를 만나보세요
              </p>
            </div>
          </section>

          {/* 🎯 모든 리뷰 콘텐츠 */}
          <ReviewsPageContent 
            allReviews={transformedReviews}
            trainers={trainers}
          />

        </main>
      </div>
    );

  } catch (error) {
    console.error('센터별 리뷰 페이지 로딩 오류:', error);
    
    // 🎯 오류 발생시 기본 페이지 렌더링
    return (
      <div className="min-h-screen">
        <main className="pt-12 md:pt-16">
          <section className="bg-gradient-to-br from-[var(--center-primary)] to-[var(--center-secondary)] text-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                고객 후기
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                {centerInfo.name}를 이용하신 회원님들의 생생한 후기를 만나보세요
              </p>
            </div>
          </section>
          
          <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                페이지 로딩 중 오류가 발생했습니다
              </h2>
              <p className="text-gray-600 mb-6">
                잠시 후 다시 시도해주세요.
              </p>
              <button 
                onClick={() => window.location.reload()}
                className="bg-[var(--center-primary)] text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-all duration-200"
              >
                새로고침
              </button>
            </div>
          </section>
        </main>
      </div>
    );
  }
}
