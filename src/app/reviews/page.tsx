// 바디텍쳐 고객 리뷰 상세 페이지
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ReviewsPageContent from '@/components/ReviewsPageContent';
import { getTrainers } from '@/lib/sanityData';
import { client } from '@/lib/sanity';
import { COMPANY_INFO } from '@/constants/contact';
import { generatePageMetadata } from '@/lib/metadata';

// SEO 최적화를 위한 메타데이터 설정
export const metadata = generatePageMetadata({
  title: '고객 후기',
  description: '바디텍쳐 왕십리 청계점을 이용하신 회원님들의 생생한 후기를 만나보세요. 실제 경험담과 변화 스토리를 통해 바디텍쳐의 차별화된 서비스를 확인하실 수 있습니다.',
  path: '/reviews',
  keywords: ['고객후기', '헬스장후기', 'PT후기', '회원리뷰', '운동후기', '피트니스후기'],
});

export default async function ReviewsPage() {
  try {
    // 🎯 병렬로 모든 데이터 로딩 (모든 리뷰 + 트레이너)
    const [allReviews, trainers] = await Promise.all([
      // 모든 리뷰 (최신순)
      client.fetch(`*[_type == "review" && isPublished == true] | order(createdAt desc) {
        _id,
        author,
        reviewContent,
        rating,
        source,
        createdAt,
        trainer->{
          _id,
          name,
          slug
        }
      }`),
      // 트레이너 목록
      getTrainers()
    ]);

    // 리뷰 데이터 변환
    const transformedReviews = allReviews.map((review: any) => ({
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
      <Header />

      <main className="pt-12 md:pt-16">
        {/* 페이지 헤더 */}
        <section className="bg-gradient-to-b from-red-600 to-orange-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              고객 후기
            </h1>
            <p className="text-xl text-orange-100 max-w-3xl mx-auto">
              {COMPANY_INFO.name}를 이용하신 회원님들의 생생한 후기를 만나보세요
            </p>
          </div>
        </section>

        {/* 🎯 모든 리뷰 콘텐츠 */}
        <ReviewsPageContent 
          allReviews={transformedReviews}
          trainers={trainers}
        />

      </main>

      <Footer />
    </div>
  );

  } catch (error) {
    console.error('리뷰 페이지 로딩 오류:', error);
    
    // 🎯 오류 발생시 기본 페이지 렌더링
    return (
      <div className="min-h-screen">
        <Header />
        
        <main className="pt-12 md:pt-16">
          <section className="bg-gradient-to-r from-red-600 to-orange-600 text-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                고객 후기
              </h1>
              <p className="text-xl text-green-100 max-w-3xl mx-auto">
              {COMPANY_INFO.name}를 이용하신 회원님들의 생생한 후기를 만나보세요
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
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200"
              >
                새로고침
              </button>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    );
  }
}
