import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Posts from '@/components/Posts';
import Link from 'next/link';
import NewsletterForm from '@/components/NewsletterForm';
import { blogPosts } from '@/data/mockData';
import { BlogPost } from '@/types';
import { generatePageMetadata, generateCenterMetadata } from '@/lib/metadata';
import { isValidCenterId, getCenterById, getAllCenters } from '@/constants/centers';
import { getCenterHexColor } from '@/constants/colors';

// 센터별 포스트 페이지 props 타입 정의
interface PostsPageProps {
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
      description: '요청하신 포스트 페이지를 찾을 수 없습니다.',
    });
  }
  
  // 센터 정보 가져오기
  const centerInfo = getCenterById(center);
  
  // 센터별 메타데이터 생성
  return generateCenterMetadata({
    centerId: center,
    title: '포스트',
    description: `${centerInfo.shortName}에서 건강과 운동에 대한 유용한 정보를 공유합니다. 전문 트레이너의 팁과 운동법을 만나보세요.`,
    path: `/${center}/posts`,
    keywords: ['운동정보', '건강정보', '피트니스팁', '운동법', '헬스정보', '트레이닝팁'],
  });
}

// 센터별 포스트 페이지 컴포넌트
export default async function PostsPage({ params }: PostsPageProps) {
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
                포스트
              </h1>
              <p className="text-xl text-white/90 mb-8">
                {centerInfo.name}의 포스트를 준비 중입니다
              </p>
              <p className="text-lg text-white/80">
                곧 유용한 건강과 운동 정보와 함께 만나뵙겠습니다
              </p>
            </div>
          </section>
        </main>
        
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <main className="pt-16">
        {/* 페이지 헤더 - 센터별 브랜딩 색상 적용 */}
        <section className="bg-gradient-to-br from-[var(--center-primary)] to-[var(--center-secondary)] text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {centerInfo.shortName} 포스트
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              건강과 운동에 대한 유용한 정보를 공유합니다
            </p>
          </div>
        </section>

        {/* 포스트 섹션 */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Posts />
          </div>
        </section>

        {/* 전체 포스트 목록 */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              전체 포스트 보기
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post: BlogPost) => (
                <article
                  key={post.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  {/* 포스트 이미지 - 센터별 색상 적용 */}
                  <div className="aspect-video bg-gray-200 flex items-center justify-center">
                    <div 
                      className="w-full h-full flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, ${getCenterHexColor(center)}20, #f3f4f620)`
                      }}
                    >
                      <svg 
                        className="w-12 h-12" 
                        style={{ color: getCenterHexColor(center) }}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                      </svg>
                    </div>
                  </div>

                  {/* 포스트 내용 */}
                  <div className="p-6">
                    <div className="text-sm text-gray-500 mb-2">
                      {(() => {
                        const date = new Date(post.date);
                        const year = date.getFullYear();
                        const month = date.getMonth() + 1;
                        const day = date.getDate();
                        return `${year}년 ${month}월 ${day}일`;
                      })()}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 line-clamp-3 mb-4">
                      {post.excerpt}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 뉴스레터 구독 */}
        <NewsletterForm />

        {/* 관련 페이지 링크 - 센터별 경로로 수정 */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              더 많은 정보 보기
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              {centerInfo.shortName}의 다양한 서비스와 정보를 확인해보세요
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`/${center}/facilities`}
                className="bg-[var(--center-primary)] text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-all duration-200 inline-block text-center"
              >
                시설 안내
              </Link>
              <Link
                href={`/${center}/trainers`}
                className="bg-[var(--center-secondary)] text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-all duration-200 inline-block text-center"
              >
                트레이너 소개
              </Link>
              <Link
                href={`/${center}/reviews`}
                className="bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors duration-200"
              >
                고객 후기
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
