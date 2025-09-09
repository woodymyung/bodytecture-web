import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // 기본 URL 설정 - Open Graph 및 Twitter 이미지의 절대 URL 생성을 위해 필요
  metadataBase: new URL('https://bodytecture.fit/'),
  
  // 기본 메타데이터 - SEO 최적화를 위한 핵심 정보들
  title: {
    template: '%s | 바디텍쳐 왕십리 청계점',
    default: '바디텍쳐 왕십리 청계점 - 정원제 프리미엄 헬스장'
  },
  description: "왕십리 청계천 근처의 정원제로 운영되는 프리미엄 헬스장. 개인 트레이닝, 그룹 클래스, 최신 운동 시설을 제공합니다.",
  keywords: "바디텍쳐, 왕십리, 청계, 헬스장, 피트니스, 개인트레이닝, PT, 그룹클래스, 정원제, 프리미엄 헬스장, 성동구 헬스장",
  
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
  
  // Open Graph - 소셜 미디어 공유 최적화
  openGraph: {
    title: "바디텍쳐 왕십리 청계점 - 정원제 프리미엄 헬스장",
    description: "왕십리 청계천 근처의 정원제로 운영되는 프리미엄 헬스장. 개인 트레이닝, 그룹 클래스, 최신 운동 시설을 제공합니다.",
    type: "website",
    locale: "ko_KR",
    siteName: "바디텍쳐 왕십리 청계점",
    url: "https://bodytecture.fit/",
    images: [
      {
        url: "/images/bodytecture_cover_optimized.jpg",
        width: 1200,
        height: 630,
        alt: "바디텍쳐 왕십리 청계점 - 정원제 프리미엄 헬스장"
      }
    ],
  },
  
  // Twitter Card - 트위터 공유 최적화
  twitter: {
    card: "summary_large_image",
    title: "바디텍쳐 왕십리 청계점",
    description: "왕십리 청계천 근처의 정원제로 운영되는 프리미엄 헬스장",
    images: ["/images/bodytecture_cover_optimized.jpg"],
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
  authors: [{ name: "바디텍쳐 왕십리 청계점", url: "https://bodytecture.fit/" }],
  category: "Fitness & Health",
  classification: "Business",
  
  // 사이트 인증 - 나중에 실제 값으로 교체 필요
  verification: {
    other: {
      "naver-site-verification": "", // 네이버 웹마스터 도구 인증 코드
      "google-site-verification": "", // Google Search Console 인증 코드
    }
  },
  
  
  // 언어 대안 - 나중에 다국어 지원시 활용
  alternates: {
    canonical: "https://bodytecture.fit/",
  },
};

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
        style={{
          background: 'linear-gradient(to bottom, #dc2626 0%, #dc2626 80px, transparent 80px)'
        }}
      >
        {children}
      </body>
    </html>
  );
}
