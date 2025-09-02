// 바디텍쳐 트레이너 소개 페이지
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Trainers from '@/components/Trainers';

export default function TrainersPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-16">
        {/* 페이지 헤더 */}
        <section className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              전문 트레이너
            </h1>
            <p className="text-xl text-orange-100 max-w-3xl mx-auto">
              바디텍쳐의 전문 트레이너들을 소개합니다
            </p>
          </div>
        </section>

        {/* 메인 페이지의 트레이너 섹션 재활용 */}
        <Trainers />
      </main>

      <Footer />
    </div>
  );
}
