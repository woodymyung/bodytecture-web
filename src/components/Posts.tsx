import React from 'react';
import Link from 'next/link';
import { blogPosts } from '@/data/mockData';
import { BlogPost } from '@/types';

// 바디텍쳐 포스트 (블로그) 컴포넌트
const Posts: React.FC = () => {
  const posts = blogPosts;

  const formatDate = (dateString: string) => {
    // Hydration 문제를 방지하기 위해 직접 포매팅
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}년 ${month}월 ${day}일`;
  };

  return (
    <section id="posts" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            바디텍쳐 포스트
          </h2>
          <p className="text-lg text-gray-600">
            건강과 운동에 대한 유용한 정보를 공유합니다
          </p>
        </div>

        {/* 블로그 포스트 그리드 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {posts.slice(0, 6).map((post: BlogPost) => (
            <article
              key={post.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {/* 포스트 이미지 */}
              <div className="aspect-video bg-gray-200 flex items-center justify-center">
                <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                  <svg className="w-12 h-12 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
              </div>

              {/* 포스트 내용 */}
              <div className="p-6">
                <div className="text-sm text-gray-500 mb-2">
                  {formatDate(post.date)}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {post.title}
                </h3>
                <p className="text-gray-600 line-clamp-3">
                  {post.excerpt}
                </p>

              </div>
            </article>
          ))}
        </div>

        {/* 자세히 보기 버튼 */}
        <div className="text-center">
          <Link
            href="/posts"
            className="bg-blue-600 text-white hover:bg-blue-700 font-semibold py-3 px-8 rounded-lg transition-colors duration-200 inline-block"
          >
            자세히 보기
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Posts;
