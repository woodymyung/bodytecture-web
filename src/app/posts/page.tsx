// 바디텍쳐 포스트 (블로그) 페이지
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Posts from '@/components/Posts';
import Link from 'next/link';
import { blogPosts } from '@/data/mockData';
import { BlogPost } from '@/types';

export default function PostsPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-16">
        {/* 페이지 헤더 */}
        <section className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              바디텍쳐 포스트
            </h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto">
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
                  {/* 포스트 이미지 */}
                  <div className="aspect-video bg-gray-200 flex items-center justify-center">
                    <div className="w-full h-full bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
                      <svg className="w-12 h-12 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-8 text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                건강 정보 뉴스레터
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                바디텍쳐의 건강과 운동 관련 최신 소식을
                이메일로 받아보세요
              </p>

              <form className="max-w-md mx-auto flex gap-4">
                <input
                  type="email"
                  placeholder="이메일 주소를 입력하세요"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
                <button
                  type="submit"
                  className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors duration-200"
                >
                  구독하기
                </button>
              </form>

              <p className="text-sm text-gray-500 mt-4">
                언제든지 구독을 취소하실 수 있습니다.
              </p>
            </div>
          </div>
        </section>

        {/* 관련 페이지 링크 */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              더 많은 정보 보기
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              바디텍쳐의 다양한 서비스와 정보를 확인해보세요
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/facilities"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 inline-block text-center"
              >
                시설 안내
              </Link>
              <Link
                href="/trainers"
                className="bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors duration-200 inline-block text-center"
              >
                트레이너 소개
              </Link>
              <a
                href="/reviews"
                className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200"
              >
                고객 후기
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
