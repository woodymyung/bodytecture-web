// 바디텍쳐 트레이너 소개 페이지
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Trainers from '@/components/Trainers';
import { trainers } from '@/data/mockData';
import Link from 'next/link';

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

        {/* 트레이너 상세 정보 */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              트레이너 소개
            </h2>

            <div className="space-y-12">
              {trainers.map((trainer, index) => (
                <div
                  key={trainer.id}
                  id={`trainer-${trainer.id}`}
                  className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 items-center`}
                >
                  {/* 트레이너 이미지 */}
                  <div className="lg:w-1/3">
                    <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center shadow-lg">
                      <div className="w-full h-full bg-gradient-to-br from-orange-100 to-red-200 rounded-lg flex items-center justify-center">
                        <span className="text-6xl font-bold text-orange-600">
                          {trainer.name.charAt(0)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 트레이너 정보 */}
                  <div className="lg:w-2/3">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {trainer.name}
                    </h3>
                    <p className="text-gray-600 text-lg mb-6">
                      {trainer.description || '전문 트레이너'}
                    </p>

                    {/* 전문 분야 */}
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">전문 분야</h4>
                        <ul className="text-gray-600 space-y-1">
                          <li>• 웨이트 트레이닝</li>
                          <li>• 다이어트 프로그램</li>
                          <li>• 근력 향상</li>
                          <li>• 자세 교정</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">자격증</h4>
                        <ul className="text-gray-600 space-y-1">
                          <li>• 생활체육지도자 2급</li>
                          <li>• NASM-CPT</li>
                          <li>• KPC</li>
                          <li>• 심폐소생술</li>
                        </ul>
                      </div>
                    </div>

                    {/* 경력 및 특징 */}
                    <div className="bg-white rounded-lg p-6 shadow-md">
                      <h4 className="font-semibold text-gray-900 mb-3">경력 및 특징</h4>
                      <p className="text-gray-600">
                        5년 이상의 트레이닝 경력을 보유하고 있으며,
                        각 회원님의 목표와 체력 상태에 맞는
                        개인 맞춤형 프로그램을 제공합니다.
                        친절하고 세심한 케어로 회원님들의
                        건강한 라이프스타일을 지원합니다.
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 트레이너 예약 안내 */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              PT 상담 및 예약
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              전문 트레이너와의 1:1 상담을 통해
              나만의 맞춤 운동 프로그램을 받아보세요
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-orange-50 rounded-lg p-6">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">무료 상담</h3>
                <p className="text-gray-600 text-sm">전문 트레이너와의 30분 무료 상담</p>
              </div>

              <div className="bg-orange-50 rounded-lg p-6">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h6a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">맞춤 프로그램</h3>
                <p className="text-gray-600 text-sm">개인 목표에 맞는 운동 프로그램 설계</p>
              </div>

              <div className="bg-orange-50 rounded-lg p-6">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">지속 관리</h3>
                <p className="text-gray-600 text-sm">정기적인 진도 체크 및 프로그램 조정</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/#contact"
                className="bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors duration-200 inline-block"
              >
                PT 상담 신청하기
              </Link>
              <Link
                href="/facilities"
                className="bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors duration-200 inline-block"
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
