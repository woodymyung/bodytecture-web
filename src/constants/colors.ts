// 센터별 브랜딩 컬러 정의
// Sanity 대신 로컬에서 관리하여 일관성 있는 디자인 시스템 구축

export const CENTER_COLORS = {
  wangsimni: {
    primary: 'red-600',          // #dc2626 - 왕십리점 메인 컬러
    primaryHex: '#dc2626',       // CSS-in-JS나 동적 스타일링용
    secondary: 'red-100',        // 보조 컬러
    accent: 'red-700',          // 강조 컬러
  },
  daechi: {
    primary: 'gray-800',         // #1f2937 - 대치점 메인 컬러  
    primaryHex: '#1f2937',       // CSS-in-JS나 동적 스타일링용
    secondary: 'gray-100',       // 보조 컬러
    accent: 'gray-900',         // 강조 컬러
  },
  cheongdam: {
    primary: 'blue-600',         // #2563eb - 청담점 임시 컬러
    primaryHex: '#2563eb',       // CSS-in-JS나 동적 스타일링용
    secondary: 'blue-100',       // 보조 컬러
    accent: 'blue-700',         // 강조 컬러
  },
} as const;

// 센터별 Tailwind 클래스 생성 헬퍼 함수
export const getCenterColorClasses = (centerId: string) => {
  const colors = CENTER_COLORS[centerId as keyof typeof CENTER_COLORS] || CENTER_COLORS.wangsimni;
  
  return {
    // 배경 관련
    bgPrimary: `bg-${colors.primary}`,
    bgSecondary: `bg-${colors.secondary}`,
    bgAccent: `bg-${colors.accent}`,
    
    // 텍스트 관련
    textPrimary: `text-${colors.primary}`,
    textSecondary: `text-${colors.secondary}`,
    textAccent: `text-${colors.accent}`,
    
    // 테두리 관련
    borderPrimary: `border-${colors.primary}`,
    borderSecondary: `border-${colors.secondary}`,
    borderAccent: `border-${colors.accent}`,
    
    // 호버 효과
    hoverBgPrimary: `hover:bg-${colors.primary}`,
    hoverTextPrimary: `hover:text-${colors.primary}`,
  };
};

// CSS-in-JS나 동적 스타일링을 위한 hex 컬러 가져오기 함수
export const getCenterHexColor = (centerId: string): string => {
  const colors = CENTER_COLORS[centerId as keyof typeof CENTER_COLORS] || CENTER_COLORS.wangsimni;
  return colors.primaryHex;
};

// 타입 정의 (필요한 경우)
export type CenterColorScheme = typeof CENTER_COLORS[keyof typeof CENTER_COLORS];
export type CenterColorKey = keyof typeof CENTER_COLORS;
