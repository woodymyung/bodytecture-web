// 다중 센터 정보 관리를 위한 상수
// 각 센터별 고유 정보와 공통 설정을 중앙집중식으로 관리

// 센터 타입 정의
export type CenterId = 'wangsimni' | 'daechi' | 'cheongdam';

// 센터별 정보 인터페이스
export interface CenterInfo {
  id: CenterId;
  name: string;
  shortName: string;
  description: string;
  status: 'active' | 'preparing'; // 운영중 또는 준비중
  
  // 연락처 정보
  contact: {
    phone: string;
    address: string;
    fullAddress: string;
  };
  
  // 영업시간
  businessHours: {
    weekdays: {
      open: string;
      close: string;
      display: string;
    };
    weekends: {
      open: string;
      close: string;
      display: string;
    };
  };
  
  // 브랜딩 (센터별 미세 조정을 위한 색상 정보)
  branding: {
    primary: string; // 메인 색상
    secondary: string; // 보조 색상
  };
  
  // SEO용 키워드
  keywords: string[];
}

// 센터별 상세 정보
export const CENTERS: Record<CenterId, CenterInfo> = {
  // 왕십리점 - 기존 정보 유지
  wangsimni: {
    id: 'wangsimni',
    name: '바디텍쳐 왕십리점',
    shortName: '바디텍쳐',
    description: '왕십리 청계천 근처의 정원제로 운영되는 프리미엄 헬스장. 개인 트레이닝, 그룹 클래스, 최신 운동 시설을 제공합니다.',
    status: 'active',
    
    contact: {
      phone: '0507-1388-8620',
      address: '서울 성동구 청계천로 452 1층',
      fullAddress: '서울 성동구 청계천로 452 (하왕십리동 291-10)'
    },
    
    businessHours: {
      weekdays: {
        open: '오전 6시',
        close: '오후 11시',
        display: '오전 6시 ~ 오후 11시'
      },
      weekends: {
        open: '오전 9시',
        close: '오후 5시',
        display: '오전 9시 ~ 오후 5시'
      }
    },
    
    branding: {
      primary: '#dc2626', // 빨간색 (기존 색상)
      secondary: '#ea580c' // 오렌지색
    },
    
    keywords: [
      '바디텍쳐', '왕십리', '청계', '헬스장', '피트니스',
      '개인트레이닝', 'PT', '그룹클래스', '정원제',
      '프리미엄 헬스장', '성동구 헬스장'
    ]
  },

  // 대치점 - 최원준GYM (임시 목업 데이터)
  daechi: {
    id: 'daechi',
    name: '최원준GYM 대치점',
    shortName: '최원준GYM',
    description: '대치동의 전문 트레이닝 센터. 개인별 맞춤 운동 프로그램과 체계적인 관리 시스템을 제공합니다.',
    status: 'active',
    
    contact: {
      phone: '0507-1315-0143', // 임시 번호
      address: '서울 강남구 삼성로 155 지하1층 121호', // 임시 주소
      fullAddress: '서울 강남구 삼성로 155 지하1층 121호'
    },
    
    businessHours: {
      weekdays: {
        open: '오전 10시',
        close: '오후 10시',
        display: '오전 10시 ~ 오후 10시'
      },
      weekends: {
        open: '오전 10시',
        close: '오후 6시',
        display: '오전 10시 ~ 오후 6시'
      }
    },
    
    branding: {
      primary: '#1d4ed8', // 파란색 (차별화)
      secondary: '#2563eb'
    },
    
    keywords: [
      '최원준짐', '대치', '대치동', '헬스장', '피트니스',
      '개인트레이닝', 'PT', '체계적관리', '전문트레이닝',
      '강남구 헬스장', '대치역'
    ]
  },

  // 청담점 - 준비중 (임시 목업 데이터)
  cheongdam: {
    id: 'cheongdam',
    name: '바디텍쳐 청담점',
    shortName: '바디텍쳐',
    description: '청담동에 새롭게 준비 중인 프리미엄 피트니스 센터입니다. 곧 만나뵙겠습니다.',
    status: 'preparing',
    
    contact: {
      phone: '0507-1388-8622', // 임시 번호
      address: '서울 강남구 청담동 준비중', // 임시 주소
      fullAddress: '서울 강남구 청담동 (상세 주소 준비중)'
    },
    
    businessHours: {
      weekdays: {
        open: '준비중',
        close: '준비중',
        display: '오픈 준비중'
      },
      weekends: {
        open: '준비중',
        close: '준비중',
        display: '오픈 준비중'
      }
    },
    
    branding: {
      primary: '#059669', // 초록색 (차별화)
      secondary: '#10b981'
    },
    
    keywords: [
      '바디텍쳐', '청담', '청담동', '헬스장', '피트니스',
      '개인트레이닝', 'PT', '오픈준비중', '프리미엄',
      '강남구 헬스장', '청담역'
    ]
  }
} as const;

// 헬퍼 함수들
export const getCenterById = (centerId: CenterId): CenterInfo => {
  return CENTERS[centerId];
};

export const getAllCenters = (): CenterInfo[] => {
  return Object.values(CENTERS);
};

export const getActiveCenters = (): CenterInfo[] => {
  return Object.values(CENTERS).filter(center => center.status === 'active');
};

// 센터 ID 유효성 검사
export const isValidCenterId = (id: string): id is CenterId => {
  return Object.keys(CENTERS).includes(id as CenterId);
};
