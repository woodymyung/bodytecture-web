'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { blogPosts } from '@/data/mockData';
import { getPosts, STRAPI_URL } from '@/lib/strapi';
import { BlogPost } from '@/types';

// 바디텍쳐 포스트 (블로그) 컴포넌트
const Posts: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  // Strapi에서 포스트 데이터 가져오기
  // Strapi API를 통해 실시간 포스트 데이터를 가져오고, 실패 시 mockData로 폴백 처리
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        if (data.length > 0) {
          setPosts(data); // Strapi에서 가져온 실제 데이터 사용
        } else {
          // Strapi에 데이터가 없으면 mockData 사용 (개발 환경용)
          setPosts(blogPosts);
        }
      } catch (error) {
        console.error('포스트 데이터 로딩 실패:', error);
        // 폴백으로 기존 mockData 사용 (네트워크 오류 시)
        setPosts(blogPosts);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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

        {/* 로딩 상태 표시 */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">포스트를 불러오는 중...</p>
          </div>
        ) : (
          <>
            {/* 블로그 포스트 그리드 */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {posts.slice(0, 6).map((post: BlogPost) => (
            <article
              key={post.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {/* 포스트 이미지 - Strapi의 coverImage 필드를 사용하며, 없을 경우 기본 아이콘 표시 */}
              <div className="aspect-video bg-gray-200 flex items-center justify-center">
                {post.coverImage ? (
                  <img
                    src={`${STRAPI_URL}${post.coverImage}`}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                    <svg className="w-12 h-12 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                  </div>
                )}
              </div>

              {/* 포스트 내용 - Strapi의 title, slug, content 필드를 직접 사용하여 표시 */}
              <div className="p-6">
                <div className="text-sm text-gray-500 mb-2">
                  {formatDate(post.publishedAt || post.createdAt || post.date || '')}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors duration-200">
                  <Link href={`/posts/${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>
                <p className="text-gray-600 line-clamp-3">
                  {post.content?.[0]?.children?.[0]?.text || post.excerpt || '내용이 없습니다.'}
                </p>
                <div className="mt-4">
                  <Link
                    href={`/posts/${post.slug}`}
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                  >
                    더 읽어보기 →
                  </Link>
                </div>
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
          </>
        )}
      </div>
    </section>
  );
};

export default Posts;
