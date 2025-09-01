'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getPostBySlug, STRAPI_URL } from '@/lib/strapi';

// 포스트 상세 페이지 컴포넌트
const PostDetail: React.FC = () => {
  const params = useParams();
  const slug = params.slug as string;

  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Strapi에서 특정 포스트 데이터 가져오기
  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;

      try {
        setLoading(true);
        const data = await getPostBySlug(slug);

        if (data) {
          setPost(data);
        } else {
          setError('포스트를 찾을 수 없습니다.');
        }
      } catch (err) {
        console.error('포스트 로딩 실패:', err);
        setError('포스트를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  // 날짜 포맷팅 함수
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // 로딩 상태
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">포스트를 불러오는 중...</p>
          </div>
        </div>
      </div>
    );
  }

  // 에러 상태
  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center py-16">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">포스트를 찾을 수 없습니다</h1>
            <p className="text-gray-600 mb-8">{error}</p>
            <Link
              href="/posts"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              포스트 목록으로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 네비게이션 */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link
            href="/posts"
            className="text-blue-600 hover:text-blue-700 font-medium flex items-center"
          >
            ← 포스트 목록으로 돌아가기
          </Link>
        </div>
      </div>

      {/* 포스트 내용 */}
      <article className="max-w-4xl mx-auto px-4 py-8">
        {/* 포스트 헤더 */}
        <header className="mb-8">
          <div className="text-sm text-gray-500 mb-2">
            {formatDate(post.publishedAt || post.published || post.createdAt)}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>

          {/* 포스트 이미지 */}
          {post.coverImage && (
            <div className="mb-8">
              <img
                src={`${STRAPI_URL}${post.coverImage}`}
                alt={post.title}
                className="w-full h-64 md:h-96 object-cover rounded-lg shadow-md"
              />
            </div>
          )}
        </header>

        {/* 포스트 본문 */}
        <div className="prose prose-lg max-w-none">
          {/* Strapi의 content 필드 처리 */}
          {post.content && Array.isArray(post.content) ? (
            <div className="space-y-4">
              {post.content.map((block: any, index: number) => {
                if (block.type === 'paragraph' && block.children) {
                  return (
                    <p key={index} className="text-gray-700 leading-relaxed">
                      {block.children.map((child: any, childIndex: number) => {
                        if (child.type === 'text') {
                          return <span key={childIndex}>{child.text}</span>;
                        }
                        return null;
                      })}
                    </p>
                  );
                }
                return null;
              })}
            </div>
          ) : (
            // content가 없는 경우 excerpt나 기본 메시지 표시
            <div className="text-gray-700">
              {post.excerpt || '포스트 내용이 준비 중입니다.'}
            </div>
          )}
        </div>

        {/* 포스트 푸터 */}
        <footer className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              마지막 수정: {formatDate(post.updatedAt || post.publishedAt || post.createdAt)}
            </div>
            <Link
              href="/posts"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              다른 포스트 보기 →
            </Link>
          </div>
        </footer>
      </article>
    </div>
  );
};

export default PostDetail;
