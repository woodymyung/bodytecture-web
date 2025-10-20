import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { getRootPageSEO } from '@/lib/sanityData';
import { urlFor } from '@/lib/sanity';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ISR 설정 - 60초마다 루트 레이아웃 데이터 재검증
export const revalidate = 60;

// 동적 메타데이터 생성 함수 - Sanity SEO Settings에서 루트 페이지 메타데이터 조회
export async function generateMetadata(): Promise<Metadata> {
  // Sanity에서 루트 페이지 SEO 데이터 조회
  const rootPageSEO = await getRootPageSEO();
  
  // Sanity 데이터가 있으면 사용, 없으면 fallback 데이터 사용
  const title = rootPageSEO?.metaTitle || '바디텍쳐 & 최원준GYM - 서울 프리미엄 피트니스 센터';
  const description = rootPageSEO?.metaDescription || '왕십리·대치·청담 3개 지점 운영. 전문 PT와 그룹클래스를 제공하는 프리미엄 헬스장입니다.';
  const keywords = rootPageSEO?.keywords?.join(', ') || '바디텍쳐, 최원준GYM, 헬스장, PT, 센터선택, 왕십리, 대치, 청담, 피트니스';

  // Sanity OG 이미지 처리
  let ogImageUrl = '/images/opengraphimage.png';
  if (rootPageSEO?.ogImage?.asset) {
    try {
      ogImageUrl = urlFor(rootPageSEO.ogImage)
        .width(1200)
        .height(630)
        .quality(90)
        .format('webp')
        .fit('crop')
        .url();
    } catch (error) {
      console.warn('루트 페이지 OG 이미지 변환 실패:', error);
    }
  }

  return {
    // 기본 URL 설정 - Open Graph 및 Twitter 이미지의 절대 URL 생성을 위해 필요
    metadataBase: new URL('https://bodytecture.fit/'),
    
    // 기본 메타데이터 - Sanity SEO Settings에서 가져온 데이터 사용
    // template 제거: 각 페이지의 SEO Settings title을 그대로 사용
    title: title,
    description,
    keywords,
    
    // 아이콘 설정 - 다양한 디바이스와 브라우저 호환성을 위한 완전한 favicon 구성
    icons: {
      icon: [
        { url: "/favicon.png", type: "image/png" }, // 모던 브라우저를 위한 고품질 PNG
        { url: "/favicon.ico", type: "image/x-icon" } // 레거시 브라우저 호환성
      ],
      shortcut: "/favicon.ico", // 브라우저 바로가기용
      apple: "/favicon.png", // Apple 디바이스 최적화
      other: {
        rel: "apple-touch-icon-precomposed",
        url: "/favicon.png", // iOS 홈스크린 아이콘
      }
    },
    
    // Open Graph - 소셜 미디어 공유 최적화 (Sanity 데이터 활용)
    openGraph: {
      title,
      description,
      type: "website",
      locale: "ko_KR",
      siteName: "바디텍쳐 & 최원준GYM",
      url: "https://bodytecture.fit/",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title
        }
      ],
    },
    
    // Twitter Card - 트위터 공유 최적화 (Sanity 데이터 활용)
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
    
    // 검색엔진 크롤링 설정
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    
    // 기타 메타데이터
    authors: [{ name: "바디텍쳐 & 최원준GYM", url: "https://bodytecture.fit/" }],
    category: "Fitness & Health",
    classification: "Business",
    
    // 사이트 인증 - 검색엔진 웹마스터 도구 인증을 위한 메타 태그
    verification: {
      other: {
        "naver-site-verification": "64cacd4023b8740c8e97263f049f17d2ac44c297", // 네이버 웹마스터 도구 인증 코드
        "google-site-verification": "", // Google Search Console 인증 코드 (DNS 인증 사용 중)
      }
    },
    
    // 언어 대안 - 나중에 다국어 지원시 활용
    alternates: {
      canonical: "https://bodytecture.fit/",
    },
  };
}

// Viewport 설정 - Next.js 15부터 별도 export 필요
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
