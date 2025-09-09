// 바디텍쳐 트레이너 소개 페이지
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Trainers from '@/components/Trainers';
import { getTrainers } from '@/lib/sanityData';
import { COMPANY_INFO } from '@/constants/contact';
import { generatePageMetadata } from '@/lib/metadata';

// SEO 최적화를 위한 메타데이터 설정
export const metadata = generatePageMetadata({
  title: '전문 트레이너',
  description: '바디텍쳐 왕십리 청계점의 전문 트레이너들을 소개합니다. 경험이 풍부한 트레이너들이 회원님의 건강한 변화를 위해 최선을 다하겠습니다.',
  path: '/trainers',
  keywords: ['전문트레이너', '피트니스트레이너', 'PT', '개인트레이닝', '헬스트레이너'],
});

export default async function TrainersPage() {
  // Sanity에서 트레이너 데이터 가져오기
  const trainers = await getTrainers();
  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-12 md:pt-16">
        {/* 페이지 헤더 */}
        <section className="bg-gradient-to-b from-red-600 to-orange-600 text-white py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              전문 트레이너
            </h1>
            <p className="text-xl text-orange-100 max-w-3xl mx-auto">
              {COMPANY_INFO.name}의 전문 트레이너들을 소개합니다
            </p>
          </div>
        </section>

        {/* 메인 페이지의 트레이너 섹션 재활용 - 헤더 숨김 */}
        <Trainers trainers={trainers} hideHeader={true} />
      </main>

      <Footer />
    </div>
  );
}
