// 바디텍쳐 고객 리뷰 상세 페이지
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Reviews from '@/components/Reviews';
import { reviews } from '@/data/mockData';

export default function ReviewsPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-16">
        {/* 페이지 헤더 */}
        <section className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              고객 후기
            </h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              바디텍쳐를 이용하신 회원님들의 생생한 후기입니다
            </p>
          </div>
        </section>

        {/* 리뷰 슬라이더 */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reviews />
          </div>
        </section>

        {/* 전체 리뷰 목록 */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              전체 후기 보기
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {reviews.map((review, index) => (
                <div
                  key={review.id}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
                >
                  {/* 별점 */}
                  <div className="flex justify-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-yellow-400 fill-current"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>

                  {/* 후기 내용 */}
                  <blockquote className="mb-4">
                    <p className="text-gray-700 italic text-center">
                      "{review.content}"
                    </p>
                  </blockquote>

                  {/* 작성자 정보 */}
                  <div className="text-center">
                    <p className="font-semibold text-gray-900">{review.author}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(review.date).toLocaleDateString('ko-KR')}
                      {review.source && ` • ${review.source}`}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* 더 많은 후기 안내 */}
            <div className="mt-12 text-center">
              <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  더 많은 후기를 확인해보세요
                </h3>
                <p className="text-gray-600 mb-6">
                  네이버, 구글, 직접 방문 등 다양한 채널에서
                  바디텍쳐 회원님들의 후기를 만나보실 수 있습니다.
                </p>
                <div className="flex justify-center space-x-4">
                  <a
                    href="#"
                    className="bg-yellow-400 text-gray-900 px-6 py-2 rounded-lg font-medium hover:bg-yellow-500 transition-colors duration-200"
                  >
                    네이버 리뷰 보기
                  </a>
                  <a
                    href="#"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
                  >
                    구글 리뷰 보기
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 후기 작성 유도 */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              바디텍쳐의 회원이 되어보세요
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              직접 경험하고 만족하신 회원님들의 후기를 듣는 것보다
              직접 체험해보는 것이 가장 확실합니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/#contact"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
              >
                무료 체험 신청하기
              </a>
              <a
                href="/facilities"
                className="bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors duration-200"
              >
                시설 둘러보기
              </a>
              <a
                href="/trainers"
                className="bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors duration-200"
              >
                트레이너 소개
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
