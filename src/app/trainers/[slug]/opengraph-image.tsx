// 트레이너 개별 페이지용 동적 Open Graph 이미지 생성
// 각 트레이너별로 맞춤형 소셜 미디어 공유 이미지를 자동 생성

import { ImageResponse } from 'next/og';
import { getTrainerBySlug } from '@/lib/sanityData';

// 이미지 런타임 설정
export const runtime = 'edge';

// 이미지 크기 설정
export const alt = '바디텍쳐 전문 트레이너';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

// 트레이너별 동적 Open Graph 이미지 생성
export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  try {
    // URL에서 트레이너 슬러그 가져오기
    const { slug } = await params;
    const trainer = await getTrainerBySlug(slug);

    // 트레이너를 찾을 수 없는 경우 기본 이미지
    if (!trainer) {
      return new ImageResponse(
        (
          <div
            style={{
              height: '100%',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#dc2626',
              color: 'white',
              fontSize: '48px',
              fontWeight: 'bold',
            }}
          >
            바디텍쳐 트레이너
          </div>
        ),
        { ...size }
      );
    }

    return new ImageResponse(
      (
        // 트레이너 전용 Open Graph 이미지 레이아웃
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            background: 'linear-gradient(135deg, #dc2626 0%, #ea580c 50%, #f97316 100%)',
            fontFamily: '"Pretendard", "Noto Sans KR", sans-serif',
          }}
        >
          {/* 왼쪽 영역 - 브랜드 정보 */}
          <div
            style={{
              width: '60%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              paddingLeft: '80px',
            }}
          >
            {/* 브랜드명 */}
            <div
              style={{
                fontSize: '32px',
                color: 'rgba(255,255,255,0.8)',
                fontWeight: '600',
                marginBottom: '20px',
              }}
            >
              바디텍쳐 왕십리 청계점
            </div>

            {/* 트레이너 이름 */}
            <div
              style={{
                fontSize: '72px',
                color: 'white',
                fontWeight: '900',
                marginBottom: '16px',
                textShadow: '3px 3px 6px rgba(0,0,0,0.4)',
                lineHeight: '1.0',
              }}
            >
              {trainer.name}
            </div>

            {/* 역할 */}
            <div
              style={{
                fontSize: '28px',
                color: 'rgba(255,255,255,0.9)',
                fontWeight: '600',
                marginBottom: '30px',
              }}
            >
              전문 트레이너
            </div>

            {/* 트레이너 설명 (간략히) */}
            <div
              style={{
                fontSize: '20px',
                color: 'rgba(255,255,255,0.8)',
                lineHeight: '1.4',
                maxWidth: '500px',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {trainer.description || '전문적이고 체계적인 트레이닝으로 여러분의 목표 달성을 도와드립니다.'}
            </div>
          </div>

          {/* 오른쪽 영역 - 장식 및 브랜딩 */}
          <div
            style={{
              width: '40%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}
          >
            {/* 장식적 요소 */}
            <div
              style={{
                width: '200px',
                height: '200px',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '40px',
                border: '3px solid rgba(255,255,255,0.2)',
              }}
            >
              <div
                style={{
                  fontSize: '80px',
                  color: 'rgba(255,255,255,0.8)',
                  fontWeight: 'bold',
                }}
              >
                PT
              </div>
            </div>

            {/* 하단 URL */}
            <div
              style={{
                position: 'absolute',
                bottom: '30px',
                fontSize: '16px',
                color: 'rgba(255,255,255,0.6)',
              }}
            >
              woodymyung.github.io/bodytecture-web
            </div>
          </div>
        </div>
      ),
      {
        ...size,
      }
    );
  } catch (error) {
    console.error('트레이너 Open Graph 이미지 생성 오류:', error);
    
    // 오류 발생시 기본 이미지 반환
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#dc2626',
            color: 'white',
            fontSize: '48px',
            fontWeight: 'bold',
          }}
        >
          바디텍쳐 전문 트레이너
        </div>
      ),
      { ...size }
    );
  }
}
