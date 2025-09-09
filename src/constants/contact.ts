// 바디텍쳐 연락처 및 위치 정보 상수
// 모든 컴포넌트에서 일관된 정보를 사용하기 위한 중앙집중식 관리

export const CONTACT_INFO = {
  // 기본 연락처 정보
  phone: '0507-1388-8620',
  address: '서울 성동구 청계천로 452 1층',
  fullAddress: '서울 성동구 청계천로 452 (하왕십리동 291-10)',
  
  // 영업시간
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

  // 찾아오는 길 정보
  directions: {
    // 지하철 이용시
    subway: [
      {
        line: '2호선 신설동역',
        exit: '서울풍물시장 9번 출구',
        description: '우측 골목으로 365m 직진, 비우당교 건너 좌측으로 45m 직진, 주유소 가기 전 건물 1층 붉은색 간판 바디텍쳐'
      },
      {
        line: '2호선 상왕십리역',
        exit: '1-1번 출구',
        description: '좌측 청계9가 교차로 쪽으로 565m 직진, 사거리에서 좌회전, 290m 직진, 주유소 다음 건물 1층 붉은색 간판 바디텍쳐'
      }
    ],

    // 버스 이용시
    bus: [
      {
        busNumber: '성동03-1번',
        stop: '왕십리중앙교회',
        description: '하차 후 길건너 바디텍쳐 후문'
      },
      {
        busNumber: '2013번',
        stop: '청계9가, 텐즈힐2단지 정문앞',
        description: '하차 후 비우당교 방향으로 160m 직진, 주유소 가기 전 건물 1층 붉은색 간판 바디텍쳐'
      }
    ],

    // 자차 이용시
    car: {
      address: '서울 성동구 청계천로 452 (하왕십리동 291-10)',
      parking: '무료 주차'
    }
  }
} as const;

// 소셜미디어 및 온라인 링크 정보
export const SOCIAL_LINKS = {
  instagram: {
    url: 'https://www.instagram.com/bodytecture_official/',
    name: '인스타그램'
  },
  naver: {
    url: 'https://m.place.naver.com/place/1916023185/home/',
    name: '네이버 플레이스'
  },
  naverMap: {
    url: 'https://naver.me/58jE49aU',
    name: '네이버 지도'
  }
} as const;

// 회사 기본 정보
export const COMPANY_INFO = {
  name: '바디텍쳐 왕십리 청계점',
  shortName: '바디텍쳐',
  description: '정원제로 운영되어 쾌적한 서비스를 제공하는 프리미엄 헬스장입니다. 전문 트레이너와 함께 건강한 라이프스타일을 만들어가세요.',
  established: '2025'
} as const;
