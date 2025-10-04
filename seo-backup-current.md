# SEO 데이터 백업 - 현재 상황 (마이그레이션 전)

## 📊 현재 SEO 관리 현황

### 🔴 하드코딩된 SEO 데이터 (개발자만 수정 가능)

#### 1. 루트 페이지 (`src/app/layout.tsx`)
```typescript
title: {
  template: '%s | 바디텍쳐 왕십리 청계점',
  default: '바디텍쳐 왕십리 청계점 - 정원제 프리미엄 헬스장'
},
description: "왕십리 청계천 근처의 정원제로 운영되는 프리미엄 헬스장. 개인 트레이닝, 그룹 클래스, 최신 운동 시설을 제공합니다.",
keywords: "바디텍쳐, 왕십리, 청계, 헬스장, 피트니스, 개인트레이닝, PT, 그룹클래스, 정원제, 프리미엄 헬스장, 성동구 헬스장",

openGraph: {
  title: "바디텍쳐 왕십리 청계점 - 정원제 프리미엄 헬스장",
  description: "왕십리 청계천 근처의 정원제로 운영되는 프리미엄 헬스장. 개인 트레이닝, 그룹 클래스, 최신 운동 시설을 제공합니다.",
},

twitter: {
  title: "바디텍쳐 왕십리 청계점",
  description: "왕십리 청계천 근처의 정원제로 운영되는 프리미엄 헬스장",
}
```

**문제점**: 루트 페이지가 센터 선택 페이지임에도 왕십리 특화 메타데이터

#### 2. 센터 선택 페이지 (`src/app/page.tsx`)
```typescript
title: '센터 선택',
description: '바디텍쳐와 최원준GYM의 지점을 선택하세요. 왕십리, 대치, 청담점에서 전문 트레이닝 서비스를 제공합니다.',
keywords: ['바디텍쳐', '최원준GYM', '헬스장', '피트니스센터', '왕십리', '대치', '청담', '센터선택']
```

#### 3. 트레이너 목록 페이지 (`src/app/[center]/trainers/page.tsx`)
```typescript
title: `전문 트레이너`,
description: `${centerInfo.name}의 전문 트레이너들을 소개합니다. 경험이 풍부한 트레이너들이 회원님의 건강한 변화를 위해 최선을 다하겠습니다.`,
keywords: ['전문트레이너', '피트니스트레이너', 'PT', '개인트레이닝', '헬스트레이너']
```

#### 4. 리뷰 페이지 (`src/app/[center]/reviews/page.tsx`)
```typescript
title: '고객 후기',
description: `${centerInfo.name}을 이용하신 회원님들의 생생한 후기를 만나보세요. 실제 경험담과 변화 스토리를 통해 차별화된 서비스를 확인하실 수 있습니다.`,
keywords: ['고객후기', '헬스장후기', 'PT후기', '회원리뷰', '운동후기', '피트니스후기']
```

#### 5. 포스트 페이지 (`src/app/[center]/posts/page.tsx`)
```typescript
title: '포스트',
description: `${centerInfo.shortName}에서 건강과 운동에 대한 유용한 정보를 공유합니다. 전문 트레이너의 팁과 운동법을 만나보세요.`,
keywords: ['운동정보', '건강정보', '피트니스팁', '운동법', '헬스정보', '트레이닝팁']
```

#### 6. 시설 안내 페이지 (`src/app/[center]/facilities/page.tsx`)
```typescript
title: '시설 안내',
description: `${centerInfo.name}의 쾌적하고 최신식 시설을 만나보세요. 다양한 운동 기구와 편의시설을 이용하실 수 있습니다.`,
keywords: ['헬스장시설', '운동시설', '피트니스시설', '헬스기구', '라커룸', '샤워실', '주차장']
```

### 🟡 부분적 Sanity 관리

#### 7. 센터 메인 페이지 (`src/app/[center]/layout.tsx`)
```typescript
// Sanity에서 가져오는 데이터
title: centerInfo.name,           // ✅ Sanity
description: centerInfo.description, // ✅ Sanity  
keywords: centerInfo.seo.keywords,   // ✅ Sanity

// 하지만 centerInfo.seo.metaTitle, metaDescription은 사용되지 않음 ❌
```

#### 8. 트레이너 개별 페이지 (`src/app/[center]/trainers/[slug]/page.tsx`)
```typescript
// Sanity에서 가져오는 데이터
name: trainer.name,              // ✅ Sanity
description: trainer.description, // ✅ Sanity
images: trainer.images           // ✅ Sanity

// 하지만 트레이너별 SEO 최적화 데이터는 없음 ❌
```

## 🎯 마이그레이션 목표

### 통합 SEO 스키마 구조 (계층형)
```typescript
{
  _type: 'seoSettings',
  
  rootPage: {
    metaTitle: '바디텍쳐 & 최원준GYM - 서울 프리미엄 피트니스 센터',
    metaDescription: '왕십리·대치·청담 3개 지점 운영. 전문 PT와 그룹클래스를 제공하는 프리미엄 헬스장입니다.',
    keywords: ['바디텍쳐', '최원준GYM', '헬스장', 'PT', '센터선택']
  },
  
  centers: [
    {
      centerId: 'wangsimni',
      mainPage: { metaTitle: '...', metaDescription: '...', keywords: [...] },
      trainersPage: { metaTitle: '...', metaDescription: '...', keywords: [...] },
      reviewsPage: { metaTitle: '...', metaDescription: '...', keywords: [...] },
      postsPage: { metaTitle: '...', metaDescription: '...', keywords: [...] },
      facilitiesPage: { metaTitle: '...', metaDescription: '...', keywords: [...] }
    }
    // ... 다른 센터들
  ],
  
  trainers: [
    {
      slug: 'kimkwon',
      centerId: 'wangsimni',
      metaTitle: '김권 - 보디빌딩 전문 트레이너',
      metaDescription: '...',
      keywords: ['김권트레이너', '보디빌딩'],
      specialties: ['보디빌딩', '근력강화']
    }
    // ... 다른 트레이너들
  ]
}
```

## 🚨 현재 문제점 요약

1. **루트 페이지**: 왕십리 특화 → 브랜드 통합 필요
2. **하드코딩 의존**: 마케팅 팀이 SEO 변경 불가
3. **SEO 최적화 부족**: 시즌별, 전문분야별 차별화 불가
4. **트레이너 개별 SEO**: 모든 트레이너가 동일한 SEO 패턴
5. **데이터 분산**: SEO 관련 정보가 코드 곳곳에 흩어져 있음

## 📅 백업 생성일
- 생성일: 2024년 10월 3일
- 작업자: AI Assistant
- 목적: SEO 통합 관리 시스템 구축을 위한 현황 백업
