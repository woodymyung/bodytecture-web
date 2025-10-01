// 센터별 트레이너 개별 페이지용 동적 Open Graph 이미지 생성
// 각 센터의 트레이너별로 맞춤형 소셜 미디어 공유 이미지를 자동 생성

import { ImageResponse } from 'next/og';
import { getTrainerBySlug, getTrainers } from '@/lib/sanityData';
import { getCenterHexColor } from '@/constants/colors';
import { isValidCenterId, getCenterById, getAllCenters } from '@/constants/centers';

// Static export를 위한 설정
export const dynamic = 'force-static';

// 이미지 크기 설정
export const alt = '전문 트레이너';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

// 센터별 트레이너 동적 Open Graph 이미지 생성
export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ center: string; slug: string }>;
}) {
  try {
    // URL에서 센터와 트레이너 슬러그 가져오기
    const { center, slug } = await params;
    
    // 센터 유효성 검사
    if (!isValidCenterId(center)) {
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
            페이지를 찾을 수 없습니다
          </div>
        ),
        { ...size }
      );
    }
    
    // 센터 정보와 트레이너 정보 가져오기
    const centerInfo = getCenterById(center);
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
              background: getCenterHexColor(center),
              color: 'white',
              fontSize: '48px',
              fontWeight: 'bold',
            }}
          >
            {centerInfo.name} 트레이너
          </div>
        ),
        { ...size }
      );
    }

    return new ImageResponse(
      (
        // 센터별 트레이너 전용 Open Graph 이미지 레이아웃
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            background: `linear-gradient(135deg, ${getCenterHexColor(center)} 0%, #f3f4f6 100%)`,
            fontFamily: 'system-ui, -apple-system, sans-serif',
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
            {/* 센터별 브랜드명 */}
            <div
              style={{
                fontSize: '32px',
                color: 'rgba(255,255,255,0.8)',
                fontWeight: '600',
                marginBottom: '20px',
              }}
            >
              {centerInfo.name}
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
              bodytecture.fit
            </div>
          </div>
        </div>
      ),
      {
        ...size,
      }
    );
  } catch (error) {
    console.error('센터별 트레이너 Open Graph 이미지 생성 오류:', error);
    
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
          전문 트레이너
        </div>
      ),
      { ...size }
    );
  }
}

// Static export를 위한 정적 경로 생성 - 모든 센터와 트레이너 조합
export async function generateStaticParams() {
  const centers = getAllCenters();
  const trainers = await getTrainers();
  
  const params = [];
  for (const center of centers) {
    for (const trainer of trainers) {
      params.push({
        center: center.id,
        slug: trainer.slug,
      });
    }
  }
  return params;
}
