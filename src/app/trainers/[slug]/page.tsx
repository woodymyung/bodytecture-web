// 트레이너 개별 페이지
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { trainers } from '@/data/mockData';
import Link from 'next/link';

export default function TrainerPage({ params }: { params: { slug: string } }) {
  const trainer = trainers.find(t => t.slug === params.slug);

  if (!trainer) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-16">
        {/* 트레이너 히어로 섹션 */}
        <section className="bg-gradient-to-r from-red-600 to-orange-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              {/* 트레이너 프로필 이미지 */}
              <div className="lg:w-1/3">
                <div className="aspect-square bg-white bg-opacity-20 rounded-2xl flex items-center justify-center shadow-2xl">
                  <div className="w-full h-full bg-gradient-to-br from-white/30 to-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                    <span className="text-8xl font-bold text-white drop-shadow-lg">
                      {trainer.name.charAt(0)}
                    </span>
                  </div>
                </div>
              </div>

              {/* 트레이너 기본 정보 */}
              <div className="lg:w-2/3 text-center lg:text-left">
                <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">
                  {trainer.name}
                </h1>
                <p className="text-2xl text-red-100 mb-8 font-light leading-relaxed">
                  {trainer.description}
                </p>

                {/* 소셜 미디어 */}
                {trainer.socialMedia && (
                  <div className="flex justify-center lg:justify-start space-x-4 mb-8">
                    {trainer.socialMedia.instagram && (
                      <a
                        href={trainer.socialMedia.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200"
                        aria-label={`${trainer.name} 인스타그램`}
                      >
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      </a>
                    )}
                    {trainer.socialMedia.naverBlog && (
                      <a
                        href={trainer.socialMedia.naverBlog}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200"
                        aria-label={`${trainer.name} 네이버 블로그`}
                      >
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M16.273 12.845L7.376 0H0v24h7.727V11.155L16.624 24H24V12.845z"/>
                        </svg>
                      </a>
                    )}
                  </div>
                )}

                {/* CTA 버튼 */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link
                    href="/#contact"
                    className="bg-white text-red-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all duration-200 shadow-lg"
                  >
                    OT 예약 상담
                  </Link>
                  <Link
                    href="/trainers"
                    className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-red-600 transition-all duration-200"
                  >
                    다른 트레이너 보기
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 상세 정보 섹션 */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* 전문 분야 */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  전문 분야
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {trainer.specialties && trainer.specialties.map((specialty, index) => (
                    <div
                      key={index}
                      className="bg-red-50 text-red-700 px-4 py-3 rounded-lg text-center font-medium"
                    >
                      {specialty}
                    </div>
                  ))}
                </div>
              </div>

              {/* 자격증 */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  자격증
                </h2>
                <ul className="space-y-3">
                  {trainer.certifications && trainer.certifications.map((cert, index) => (
                    <li
                      key={index}
                      className="flex items-center text-gray-700"
                    >
                      <span className="w-2 h-2 bg-orange-500 rounded-full mr-3 flex-shrink-0"></span>
                      {cert}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 경력 정보 */}
            <div className="mt-12 bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 00-2 2H10a2 2 0 00-2-2V6m8 0h2a2 2 0 012 2v6a2 2 0 01-2 2H2a2 2 0 01-2-2V8a2 2 0 012-2h2" />
                  </svg>
                </div>
                경력 정보
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <ul className="space-y-3">
                    {trainer.experience && trainer.experience.map((exp, index) => (
                      <li
                        key={index}
                        className="flex items-center text-gray-700"
                      >
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0"></span>
                        {exp}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* 트레이너 철학 */}
            {trainer.philosophy && (
              <div className="mt-12 bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-8 border-l-4 border-red-500">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  트레이닝 철학
                </h2>
                <p className="text-gray-700 text-lg leading-relaxed italic">
                  "{trainer.philosophy}"
                </p>
              </div>
            )}
          </div>
        </section>

        {/* PT 상담 CTA 섹션 */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              {trainer.name} 트레이너와 함께하세요
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              전문적인 PT 지도를 통해 목표를 달성해보세요.
              체험 수업(OT)으로 먼저 만나볼 수 있습니다.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-red-50 rounded-xl p-6">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">개인 상담</h3>
                <p className="text-gray-600 text-sm">목표와 현재 상태를 파악한 맞춤 상담</p>
              </div>

              <div className="bg-red-50 rounded-xl p-6">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h6a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">맞춤 프로그램</h3>
                <p className="text-gray-600 text-sm">개인에게 최적화된 운동 프로그램</p>
              </div>

              <div className="bg-red-50 rounded-xl p-6">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">지속적 관리</h3>
                <p className="text-gray-600 text-sm">꾸준한 진도 체크와 동기 부여</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/#contact"
                className="bg-red-600 text-white px-10 py-4 rounded-lg font-bold text-lg hover:bg-red-700 transition-all duration-200 shadow-lg"
              >
                PT 상담 신청하기
              </Link>
              <Link
                href="/facilities"
                className="bg-gray-600 text-white px-10 py-4 rounded-lg font-bold text-lg hover:bg-gray-700 transition-all duration-200 shadow-lg"
              >
                시설 둘러보기
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

// 정적 생성을 위한 파라미터 생성
export async function generateStaticParams() {
  return trainers.map((trainer) => ({
    slug: trainer.slug,
  }));
}

// 메타데이터 생성
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const trainer = trainers.find(t => t.slug === params.slug);
  
  if (!trainer) {
    return {
      title: '트레이너를 찾을 수 없습니다 - 바디텍쳐',
    };
  }

  return {
    title: `${trainer.name} - 바디텍쳐 전문 트레이너`,
    description: trainer.description,
  };
}
