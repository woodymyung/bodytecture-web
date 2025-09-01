// 바디텍쳐 시설 정보 상세 페이지
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Facilities from '@/components/Facilities';
import { facilities } from '@/data/mockData';

export default function FacilitiesPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-16">
        {/* 페이지 헤더 */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              시설 안내
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              바디텍쳐 왕십리 청계점의 쾌적하고 최신식 시설을 만나보세요
            </p>
          </div>
        </section>

        {/* 시설 상세 정보 */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* 메인 시설 이미지 슬라이더 */}
              <div>
                <Facilities />
              </div>

              {/* 시설 특징 상세 설명 */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    최적의 운동 환경
                  </h2>
                  <div className="space-y-6">
                    {facilities.map((facility) => (
                      <div key={facility.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">
                          {facility.name}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {facility.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 시설 스펙 */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    시설 스펙
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                      <span className="text-gray-700">최대 수용인원: 200명</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                      <span className="text-gray-700">층수: 지하1층 ~ 지상1층</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                      <span className="text-gray-700">주차: 지하주차장 완비</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                      <span className="text-gray-700">엘리베이터: 직통 연결</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 이용 안내 */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              이용 안내
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">운영 시간</h3>
                <p className="text-gray-600 mb-2">평일: 06:00 - 24:00</p>
                <p className="text-gray-600 mb-2">토요일: 06:00 - 24:00</p>
                <p className="text-gray-600">일요일: 06:00 - 24:00</p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">시설 이용 규칙</h3>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>• 운동복 및 운동화 착용 필수</li>
                  <li>• 개인 물품 보관함 이용</li>
                  <li>• 기구 사용 전 설명 청취</li>
                  <li>• 안전 수칙 준수</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">특별 서비스</h3>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>• 무료 주차 2시간</li>
                  <li>• 무료 생수 제공</li>
                  <li>• 샤워실 및 라커룸</li>
                  <li>• Wi-Fi 무료 이용</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 관련 페이지 링크 */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              더 알아보기
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              바디텍쳐의 다른 정보들도 확인해보세요
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/trainers"
                className="bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors duration-200"
              >
                트레이너 소개
              </a>
              <a
                href="/reviews"
                className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200"
              >
                고객 후기
              </a>
              <a
                href="/news"
                className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors duration-200"
              >
                바디텍쳐 소식
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
