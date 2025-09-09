// 동적 Open Graph 이미지 생성 - 소셜 미디어 공유시 표시될 이미지를 동적으로 생성
// 각 페이지별로 맞춤형 OG 이미지를 자동 생성하여 공유 최적화

import { ImageResponse } from 'next/og';

// Static export를 위한 설정
export const dynamic = 'force-static';

// 이미지 런타임 설정 - static export에서는 Node.js runtime 사용
// export const runtime = 'edge'; // static export와 충돌하므로 제거

// 이미지 크기 설정 (Open Graph 표준)
export const alt = '바디텍쳐 왕십리 청계점 - 정원제 프리미엄 헬스/PT';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

// 메인 페이지용 Open Graph 이미지 생성
export default async function OpengraphImage() {
  try {
    return new ImageResponse(
      (
        // Open Graph 이미지 레이아웃 - HTML/CSS로 디자인
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #dc2626 0%, #ea580c 100%)',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          {/* 상단 로고 영역 */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '40px',
            }}
          >
            <div
              style={{
                fontSize: '48px',
                fontWeight: 'bold',
                color: 'white',
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              }}
            >
              BODYTECTURE
            </div>
          </div>

          {/* 메인 타이틀 */}
          <div
            style={{
              fontSize: '64px',
              fontWeight: '900',
              color: 'white',
              textAlign: 'center',
              marginBottom: '20px',
              textShadow: '3px 3px 6px rgba(0,0,0,0.4)',
              lineHeight: '1.1',
            }}
          >
            바디텍쳐
          </div>

          {/* 서브 타이틀 */}
          <div
            style={{
              fontSize: '32px',
              color: 'rgba(255,255,255,0.9)',
              textAlign: 'center',
              marginBottom: '40px',
              fontWeight: '500',
            }}
          >
            왕십리 청계점
          </div>

          {/* 설명 텍스트 */}
          <div
            style={{
              fontSize: '24px',
              color: 'rgba(255,255,255,0.8)',
              textAlign: 'center',
              maxWidth: '800px',
              lineHeight: '1.4',
            }}
          >
            정원제로 운영되는 프리미엄 헬스장
          </div>

          {/* 하단 장식 요소 */}
          <div
            style={{
              position: 'absolute',
              bottom: '40px',
              right: '40px',
              fontSize: '18px',
              color: 'rgba(255,255,255,0.7)',
            }}
          >
            bodytecture.fit
          </div>
        </div>
      ),
      {
        ...size,
        // fonts 속성 제거 - static export에서 시스템 기본 폰트 사용
      }
    );
  } catch (error) {
    console.error('Open Graph 이미지 생성 오류:', error);
    
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
          바디텍쳐 왕십리 청계점
        </div>
      ),
      {
        ...size,
        // fonts 속성 제거 - static export에서 시스템 기본 폰트 사용
      }
    );
  }
}
